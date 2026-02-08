/**
 * Vector 검색 테스트 스크립트
 * 기존 포스트의 임베딩을 사용해서 유사한 포스트 검색
 *
 * 사용법:
 *   pnpm tsx scripts/test-vector-search.ts
 */

import { resolve } from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// 환경변수 로드
config({ path: resolve(process.cwd(), 'apps/web/.env.local') });
config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
	process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '',
	process.env.SUPABASE_SERVICE_ROLE_KEY ||
		process.env.SUPABASE_ANON_KEY ||
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
		'',
);

async function main() {
	console.log('🔍 Vector 검색 테스트 (기존 포스트 임베딩 활용)\n');

	// 1. 기준 포스트 선택 (성능 최적화 관련)
	const { data: basePost } = await supabase
		.from('posts')
		.select('id, title_ko, embedding')
		.eq('id', 122) // "느린 페이지를 마주하고 나서야 알게 된 것들"
		.single();

	if (!basePost?.embedding) {
		console.error('❌ 기준 포스트를 찾을 수 없습니다.');
		return;
	}

	// 임베딩 파싱
	const queryEmbedding =
		typeof basePost.embedding === 'string'
			? JSON.parse(basePost.embedding)
			: basePost.embedding;

	console.log(`📝 기준 포스트: "${basePost.title_ko}"\n`);
	console.log('='.repeat(60));
	console.log('📊 유사한 포스트 (Vector 검색 결과):');
	console.log('='.repeat(60));

	// 2. match_posts RPC로 유사도 검색
	const { data: results, error } = await supabase.rpc('match_posts', {
		query_embedding: queryEmbedding,
		match_threshold: 0.3,
		match_count: 10,
	});

	if (error) {
		console.error('❌ 검색 실패:', error.message);
		return;
	}

	if (results && results.length > 0) {
		results.forEach(
			(
				item: {
					id: number;
					title_ko: string;
					description_ko: string;
					similarity: number;
				},
				idx: number,
			) => {
				const similarityPercent = (item.similarity * 100).toFixed(1);
				const isSelf = item.id === basePost.id;

				console.log(
					`\n${idx + 1}. [유사도: ${similarityPercent}%] ${item.title_ko}${isSelf ? ' ⭐ (기준)' : ''}`,
				);
				console.log(`   ID: ${item.id}`);
				if (item.description_ko) {
					console.log(`   설명: ${item.description_ko.slice(0, 60)}...`);
				}
			},
		);
	} else {
		console.log('검색 결과 없음');
	}

	// 3. 다른 카테고리 포스트로도 테스트
	console.log(`\n\n${'='.repeat(60)}`);
	console.log('📊 런던 관련 포스트 유사도 테스트:');
	console.log('='.repeat(60));

	const { data: londonPost } = await supabase
		.from('posts')
		.select('id, title_ko, embedding')
		.eq('id', 117) // "토트넘에서 사는 사람"
		.single();

	if (londonPost?.embedding) {
		const londonEmbedding =
			typeof londonPost.embedding === 'string'
				? JSON.parse(londonPost.embedding)
				: londonPost.embedding;

		console.log(`\n📝 기준 포스트: "${londonPost.title_ko}"\n`);

		const { data: londonResults } = await supabase.rpc('match_posts', {
			query_embedding: londonEmbedding,
			match_threshold: 0.3,
			match_count: 5,
		});

		if (londonResults) {
			londonResults.forEach(
				(
					item: { id: number; title_ko: string; similarity: number },
					idx: number,
				) => {
					const similarityPercent = (item.similarity * 100).toFixed(1);
					const isSelf = item.id === londonPost.id;
					console.log(
						`${idx + 1}. [${similarityPercent}%] ${item.title_ko}${isSelf ? ' ⭐' : ''}`,
					);
				},
			);
		}
	}

	console.log('\n');
}

main().catch((err) => {
	console.error('❌ 에러:', err);
	process.exit(1);
});
