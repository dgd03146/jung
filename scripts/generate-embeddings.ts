/**
 * 기존 블로그 포스트에 임베딩 생성 스크립트
 *
 * 사용법:
 *   pnpm tsx scripts/generate-embeddings.ts
 *
 * 환경변수:
 *   - GEMINI_API_KEY: Gemini API 키
 *   - SUPABASE_URL: Supabase URL
 *   - SUPABASE_SERVICE_ROLE_KEY: Supabase 서비스 역할 키
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// ===== 설정 =====

const DELAY_MS = 200; // API 요청 간 딜레이 (rate limit 방지)

// ===== 클라이언트 초기화 =====

const supabase = createClient(
	process.env.SUPABASE_URL || '',
	process.env.SUPABASE_SERVICE_ROLE_KEY || '',
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// ===== 유틸리티 함수 =====

/**
 * 텍스트를 임베딩 벡터로 변환
 */
async function generateEmbedding(text: string): Promise<number[]> {
	const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
	const result = await model.embedContent(text);
	return result.embedding.values;
}

/**
 * 포스트 콘텐츠를 임베딩용 텍스트로 변환
 */
function preparePostText(post: {
	title_ko?: string;
	title_en?: string;
	description_ko?: string;
	description_en?: string;
	tags?: string[];
}): string {
	const parts: string[] = [];

	if (post.title_ko) parts.push(post.title_ko);
	if (post.title_en && post.title_en !== post.title_ko) {
		parts.push(post.title_en);
	}
	if (post.description_ko) parts.push(post.description_ko);
	if (post.description_en && post.description_en !== post.description_ko) {
		parts.push(post.description_en);
	}
	if (post.tags && post.tags.length > 0) {
		parts.push(post.tags.join(' '));
	}

	return parts.join('\n');
}

/**
 * 딜레이 함수
 */
function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// ===== 메인 실행 =====

async function main() {
	console.log('🚀 임베딩 생성 시작\n');

	// 환경변수 확인
	if (!process.env.GEMINI_API_KEY) {
		console.error('❌ GEMINI_API_KEY 환경변수가 설정되지 않았습니다.');
		process.exit(1);
	}

	if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
		console.error('❌ Supabase 환경변수가 설정되지 않았습니다.');
		process.exit(1);
	}

	// 임베딩이 없는 포스트 조회
	const { data: posts, error: fetchError } = await supabase
		.from('posts')
		.select('id, title_ko, title_en, description_ko, description_en, tags')
		.is('embedding', null);

	if (fetchError) {
		console.error('❌ 포스트 조회 실패:', fetchError.message);
		process.exit(1);
	}

	if (!posts || posts.length === 0) {
		console.log('✅ 모든 포스트에 이미 임베딩이 있습니다.');
		return;
	}

	console.log(`📝 임베딩 생성 대상: ${posts.length}개 포스트\n`);

	// 배치 처리
	let successCount = 0;
	let errorCount = 0;

	for (let i = 0; i < posts.length; i++) {
		const post = posts[i];
		const progress = `[${i + 1}/${posts.length}]`;

		try {
			// 임베딩용 텍스트 준비
			const text = preparePostText(post);

			if (!text.trim()) {
				console.log(`${progress} ⚠️  빈 텍스트 건너뜀: ID ${post.id}`);
				continue;
			}

			// 임베딩 생성
			const embedding = await generateEmbedding(text);

			// Supabase 업데이트
			const { error: updateError } = await supabase
				.from('posts')
				.update({ embedding })
				.eq('id', post.id);

			if (updateError) {
				throw updateError;
			}

			console.log(
				`${progress} ✅ ${post.title_ko?.slice(0, 30) || post.id}...`,
			);
			successCount++;

			// Rate limit 방지
			await delay(DELAY_MS);
		} catch (err) {
			console.log(
				`${progress} ❌ 실패: ${post.title_ko?.slice(0, 30) || post.id}`,
			);
			console.error(`   에러: ${err instanceof Error ? err.message : err}`);
			errorCount++;

			// 에러 발생 시 더 긴 딜레이
			await delay(DELAY_MS * 5);
		}
	}

	// 결과 출력
	console.log(`\n${'='.repeat(50)}`);
	console.log('📊 임베딩 생성 완료');
	console.log('='.repeat(50));
	console.log(`✅ 성공: ${successCount}개`);
	console.log(`❌ 실패: ${errorCount}개`);
	console.log(`📝 전체: ${posts.length}개`);
}

main().catch((err) => {
	console.error('❌ 예상치 못한 에러:', err);
	process.exit(1);
});
