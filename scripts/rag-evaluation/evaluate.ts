// pnpm tsx scripts/rag-evaluation/evaluate.ts

import * as fs from 'node:fs';
import * as path from 'node:path';
import { resolve } from 'node:path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: resolve(process.cwd(), 'apps/web/.env.local') });
config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), 'apps/web/.env') });
config({ path: resolve(process.cwd(), '.env') });

import {
	escapePostgrestPattern,
	KEYWORD_WEIGHT,
	MATCH_THRESHOLD,
	RRF_K,
	SIMILARITY_GAP_THRESHOLD,
	VECTOR_WEIGHT,
} from '../../packages/api/lib/constants';
import { type TestQuery, testQueries } from './test-queries';

const supabase = createClient(
	process.env.SUPABASE_URL || '',
	process.env.SUPABASE_SERVICE_ROLE_KEY || '',
);

const genAI = new GoogleGenerativeAI(
	process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY || '',
);

function calculateRecallAtK(
	results: string[],
	expected: string[],
	k: number,
): number {
	if (expected.length === 0) return 0;

	const topK = results.slice(0, k);
	const hits = topK.filter((id) => expected.includes(id)).length;
	return hits / Math.min(expected.length, k);
}

function calculateMRR(results: string[], expected: string[]): number {
	if (expected.length === 0) return 0;

	for (let i = 0; i < results.length; i++) {
		const result = results[i];
		if (result && expected.includes(result)) {
			return 1 / (i + 1);
		}
	}
	return 0;
}

function calculateP95(latencies: number[]): number {
	if (latencies.length === 0) return 0;

	const sorted = [...latencies].sort((a, b) => a - b);
	const index = Math.ceil(sorted.length * 0.95) - 1;
	return sorted[index] ?? 0;
}

const avg = (arr: number[]) =>
	arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

// DCG = sum(rel_i / log2(i+1)), NDCG = DCG / IDCG
function calculateNDCG(
	results: string[],
	expected: string[],
	k: number,
): number {
	if (expected.length === 0) return 0;

	const topK = results.slice(0, k);

	let dcg = 0;
	for (let i = 0; i < topK.length; i++) {
		const id = topK[i];
		if (id && expected.includes(id)) {
			dcg += 1 / Math.log2(i + 2);
		}
	}

	let idcg = 0;
	const idealCount = Math.min(expected.length, k);
	for (let i = 0; i < idealCount; i++) {
		idcg += 1 / Math.log2(i + 2);
	}

	return idcg > 0 ? dcg / idcg : 0;
}

async function generateEmbedding(text: string): Promise<number[]> {
	const model = genAI.getGenerativeModel({ model: 'gemini-embedding-001' });
	const result = await model.embedContent({
		content: { parts: [{ text }], role: 'user' },
		taskType: 'RETRIEVAL_QUERY',
	});
	return result.embedding.values;
}

interface SearchResult {
	ids: string[];
	latencyMs: number;
}

async function searchBaseline(query: string): Promise<SearchResult> {
	const start = performance.now();

	const escaped = escapePostgrestPattern(query);
	const { data, error } = await supabase
		.from('posts')
		.select('id')
		.or(`title_ko.ilike.%${escaped}%,description_ko.ilike.%${escaped}%`)
		.limit(10);

	if (error) {
		console.error('Baseline 검색 에러:', error.message);
		return { ids: [], latencyMs: performance.now() - start };
	}

	const ids = (data || []).map((item) => String(item.id));
	const latencyMs = performance.now() - start;

	return { ids, latencyMs };
}

async function searchVector(query: string): Promise<SearchResult> {
	const start = performance.now();

	try {
		const embedding = await generateEmbedding(query);
		const { data, error } = await supabase.rpc('match_posts', {
			query_embedding: JSON.stringify(embedding),
			match_threshold: MATCH_THRESHOLD,
			match_count: 10,
		});

		if (error) {
			console.error('Vector 검색 에러:', error.message);
			return { ids: [], latencyMs: performance.now() - start };
		}

		const filtered = (data || []).filter(
			(
				item: { similarity: number },
				_i: number,
				arr: { similarity: number }[],
			) => {
				if (arr.length === 0) return false;
				const topSimilarity = arr[0]!.similarity;
				return topSimilarity - item.similarity <= SIMILARITY_GAP_THRESHOLD;
			},
		);

		const ids = filtered.map((item: { id: number }) => String(item.id));
		const latencyMs = performance.now() - start;

		return { ids, latencyMs };
	} catch (err) {
		console.error('Vector 검색 예외:', err);
		return { ids: [], latencyMs: performance.now() - start };
	}
}

async function searchHybrid(query: string): Promise<SearchResult> {
	const start = performance.now();

	try {
		const embedding = await generateEmbedding(query);
		const { data: vectorData } = await supabase.rpc('match_posts', {
			query_embedding: JSON.stringify(embedding),
			match_threshold: MATCH_THRESHOLD,
			match_count: 10,
		});

		const filteredVector = (vectorData || []).filter(
			(
				item: { similarity: number },
				_i: number,
				arr: { similarity: number }[],
			) => {
				if (arr.length === 0) return false;
				const topSimilarity = arr[0]!.similarity;
				return topSimilarity - item.similarity <= SIMILARITY_GAP_THRESHOLD;
			},
		);

		const escapedQuery = escapePostgrestPattern(query);
		const { data: keywordData } = await supabase
			.from('posts')
			.select('id')
			.or(
				`title_ko.ilike.%${escapedQuery}%,description_ko.ilike.%${escapedQuery}%`,
			)
			.limit(10);

		const scores = new Map<string, number>();

		filteredVector.forEach(
			(item: { id: number; similarity: number }, rank: number) => {
				const id = String(item.id);
				const rrfScore = VECTOR_WEIGHT / (RRF_K + rank + 1);
				const similarityBoost = item.similarity ? item.similarity * 0.1 : 0;
				scores.set(id, (scores.get(id) || 0) + rrfScore + similarityBoost);
			},
		);

		(keywordData || []).forEach((item: { id: number }, rank: number) => {
			const id = String(item.id);
			const rrfScore = KEYWORD_WEIGHT / (RRF_K + rank + 1);
			scores.set(id, (scores.get(id) || 0) + rrfScore);
		});

		const ids = [...scores.entries()]
			.sort((a, b) => b[1] - a[1])
			.slice(0, 10)
			.map(([id]) => id);

		const latencyMs = performance.now() - start;

		return { ids, latencyMs };
	} catch (err) {
		console.error('Hybrid 검색 예외:', err);
		return { ids: [], latencyMs: performance.now() - start };
	}
}

interface EvaluationResult {
	method: string;
	recallAt5: number;
	recallAt10: number;
	mrr: number;
	ndcgAt5: number;
	ndcgAt10: number;
	p95LatencyMs: number;
	queryResults: Array<{
		query: string;
		category: string;
		recallAt5: number;
		mrr: number;
		ndcgAt5: number;
		latencyMs: number;
		resultIds: string[];
		expectedIds: string[];
	}>;
}

async function evaluateSearchMethod(
	methodName: string,
	searchFn: (query: string) => Promise<SearchResult>,
	queries: TestQuery[],
): Promise<EvaluationResult> {
	const recallAt5List: number[] = [];
	const recallAt10List: number[] = [];
	const mrrList: number[] = [];
	const ndcgAt5List: number[] = [];
	const ndcgAt10List: number[] = [];
	const latencies: number[] = [];
	const queryResults: EvaluationResult['queryResults'] = [];

	for (const { query, expectedPostIds, category } of queries) {
		if (expectedPostIds.length === 0) {
			continue;
		}

		const { ids, latencyMs } = await searchFn(query);

		const recallAt5 = calculateRecallAtK(ids, expectedPostIds, 5);
		const recallAt10 = calculateRecallAtK(ids, expectedPostIds, 10);
		const mrr = calculateMRR(ids, expectedPostIds);
		const ndcgAt5 = calculateNDCG(ids, expectedPostIds, 5);
		const ndcgAt10 = calculateNDCG(ids, expectedPostIds, 10);

		recallAt5List.push(recallAt5);
		recallAt10List.push(recallAt10);
		mrrList.push(mrr);
		ndcgAt5List.push(ndcgAt5);
		ndcgAt10List.push(ndcgAt10);
		latencies.push(latencyMs);

		queryResults.push({
			query,
			category,
			recallAt5,
			mrr,
			ndcgAt5,
			latencyMs,
			resultIds: ids,
			expectedIds: expectedPostIds,
		});

		await new Promise((resolve) => setTimeout(resolve, 100));
	}

	return {
		method: methodName,
		recallAt5: avg(recallAt5List),
		recallAt10: avg(recallAt10List),
		mrr: avg(mrrList),
		ndcgAt5: avg(ndcgAt5List),
		ndcgAt10: avg(ndcgAt10List),
		p95LatencyMs: calculateP95(latencies),
		queryResults,
	};
}

async function runEvaluation() {
	console.log('🔍 RAG 검색 성능 평가 시작\n');
	console.log(`📋 테스트 쿼리: ${testQueries.length}개\n`);

	if (
		!process.env.GOOGLE_GENERATIVE_AI_API_KEY &&
		!process.env.GEMINI_API_KEY
	) {
		console.error(
			'❌ GOOGLE_GENERATIVE_AI_API_KEY 환경변수가 설정되지 않았습니다.',
		);
		process.exit(1);
	}

	const taggedQueries = testQueries.filter(
		(q) => q.expectedPostIds.length > 0,
	).length;
	if (taggedQueries === 0) {
		console.log('❌ 정답이 태깅된 쿼리가 없습니다.');
		console.log('   test-queries.ts에서 expectedPostIds를 채워주세요.\n');
		return;
	}

	console.log(`✅ 정답 태깅된 쿼리: ${taggedQueries}개\n`);

	const results: EvaluationResult[] = [];

	console.log('📊 Baseline (ilike) 평가 중...');
	results.push(
		await evaluateSearchMethod('baseline', searchBaseline, testQueries),
	);

	console.log('📊 Vector (pgvector) 평가 중...');
	results.push(await evaluateSearchMethod('vector', searchVector, testQueries));

	console.log('📊 Hybrid (RRF) 평가 중...');
	results.push(await evaluateSearchMethod('hybrid', searchHybrid, testQueries));

	console.log(`\n${'='.repeat(60)}`);
	console.log('📈 평가 결과');
	console.log(`${'='.repeat(60)}\n`);

	console.log(
		'| Method   | Recall@5 | Recall@10 | MRR    | NDCG@5 | NDCG@10 | p95 Latency |',
	);
	console.log(
		'|----------|----------|-----------|--------|--------|---------|-------------|',
	);

	for (const r of results) {
		console.log(
			`| ${r.method.padEnd(8)} | ${(r.recallAt5 * 100).toFixed(1).padStart(6)}% | ${(r.recallAt10 * 100).toFixed(1).padStart(7)}% | ${r.mrr.toFixed(3).padStart(6)} | ${r.ndcgAt5.toFixed(3).padStart(6)} | ${r.ndcgAt10.toFixed(3).padStart(7)} | ${r.p95LatencyMs.toFixed(0).padStart(7)}ms |`,
		);
	}

	console.log('\n📋 쿼리별 상세 결과 (Hybrid):');
	const hybridResult = results.find((r) => r.method === 'hybrid');
	if (hybridResult) {
		for (const qr of hybridResult.queryResults) {
			const status = qr.recallAt5 > 0 ? '✅' : '❌';
			console.log(
				`${status} "${qr.query}" - Recall@5: ${(qr.recallAt5 * 100).toFixed(0)}%, MRR: ${qr.mrr.toFixed(2)}`,
			);
			console.log(`   기대: [${qr.expectedIds.join(', ')}]`);
			console.log(`   결과: [${qr.resultIds.slice(0, 5).join(', ')}]`);
		}
	}

	if (hybridResult) {
		console.log('\n📊 카테고리별 분석 (Hybrid):');
		const categories = new Map<
			string,
			{ recall: number[]; mrr: number[]; ndcg: number[] }
		>();

		for (const qr of hybridResult.queryResults) {
			if (!categories.has(qr.category)) {
				categories.set(qr.category, { recall: [], mrr: [], ndcg: [] });
			}
			const cat = categories.get(qr.category)!;
			cat.recall.push(qr.recallAt5);
			cat.mrr.push(qr.mrr);
			cat.ndcg.push(qr.ndcgAt5);
		}

		console.log('| Category     | Queries | Recall@5 | MRR    | NDCG@5 |');
		console.log('|--------------|---------|----------|--------|--------|');

		for (const [cat, data] of categories) {
			console.log(
				`| ${cat.padEnd(12)} | ${String(data.recall.length).padStart(7)} | ${(avg(data.recall) * 100).toFixed(1).padStart(6)}% | ${avg(data.mrr).toFixed(3).padStart(6)} | ${avg(data.ndcg).toFixed(3).padStart(6)} |`,
			);
		}
	}

	const resultsDir = path.join(__dirname, 'results');
	if (!fs.existsSync(resultsDir)) {
		fs.mkdirSync(resultsDir, { recursive: true });
	}

	const timestamp = new Date().toISOString().split('T')[0];
	const outputPath = path.join(resultsDir, `${timestamp}.json`);

	const output = {
		date: timestamp,
		totalQueries: testQueries.length,
		taggedQueries,
		results: results.map((r) => ({
			method: r.method,
			recallAt5: r.recallAt5,
			recallAt10: r.recallAt10,
			mrr: r.mrr,
			ndcgAt5: r.ndcgAt5,
			ndcgAt10: r.ndcgAt10,
			p95LatencyMs: r.p95LatencyMs,
		})),
		details: results,
	};

	fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
	console.log(`\n💾 결과 저장: ${outputPath}`);

	const baseline = results.find((r) => r.method === 'baseline');
	const hybrid = results.find((r) => r.method === 'hybrid');

	if (baseline && hybrid) {
		console.log('\n🎯 개선율 요약:');
		if (baseline.recallAt5 > 0) {
			const recallImprovement =
				((hybrid.recallAt5 - baseline.recallAt5) / baseline.recallAt5) * 100;
			console.log(`   Recall@5: ${recallImprovement.toFixed(1)}% 개선`);
		} else if (hybrid.recallAt5 > 0) {
			console.log(
				`   Recall@5: ${(baseline.recallAt5 * 100).toFixed(1)}% → ${(hybrid.recallAt5 * 100).toFixed(1)}%`,
			);
		}

		if (baseline.mrr > 0) {
			const mrrImprovement = ((hybrid.mrr - baseline.mrr) / baseline.mrr) * 100;
			console.log(`   MRR: ${mrrImprovement.toFixed(1)}% 개선`);
		} else if (hybrid.mrr > 0) {
			console.log(
				`   MRR: ${baseline.mrr.toFixed(3)} → ${hybrid.mrr.toFixed(3)}`,
			);
		}

		if (baseline.ndcgAt5 > 0) {
			const ndcgImprovement =
				((hybrid.ndcgAt5 - baseline.ndcgAt5) / baseline.ndcgAt5) * 100;
			console.log(`   NDCG@5: ${ndcgImprovement.toFixed(1)}% 개선`);
		} else if (hybrid.ndcgAt5 > 0) {
			console.log(
				`   NDCG@5: ${baseline.ndcgAt5.toFixed(3)} → ${hybrid.ndcgAt5.toFixed(3)}`,
			);
		}
	}
}

runEvaluation().catch(console.error);
