/**
 * 시맨틱 검색 테스트 스크립트
 *
 * 사용법:
 *   pnpm tsx scripts/test-semantic-search.ts "검색어"
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
	const query = process.argv[2] || 'React';

	console.log('🔍 시맨틱 검색 테스트\n');
	console.log(`📝 검색어: "${query}"\n`);

	// 1. 먼저 저장된 임베딩 확인
	console.log('📊 저장된 임베딩 샘플 확인:');
	const { data: samplePost } = await supabase
		.from('posts')
		.select('id, title_ko, embedding')
		.not('embedding', 'is', null)
		.limit(1)
		.single();

	if (samplePost?.embedding) {
		// 임베딩이 문자열로 저장된 경우 파싱
		let embeddingArray: number[];
		if (typeof samplePost.embedding === 'string') {
			embeddingArray = JSON.parse(samplePost.embedding);
		} else {
			embeddingArray = samplePost.embedding as number[];
		}
		console.log(`   - 포스트: ${samplePost.title_ko}`);
		console.log(`   - 임베딩 차원: ${embeddingArray.length}`);
		console.log(
			`   - 임베딩 샘플: [${embeddingArray
				.slice(0, 3)
				.map((n) => n.toFixed(4))
				.join(', ')}...]`,
		);
	}

	// 2. 모든 포스트 가져와서 키워드 기반 유사도 보여주기
	console.log('\n📊 전체 블로그 포스트 목록:');
	console.log('='.repeat(60));

	const { data: allPosts } = await supabase
		.from('posts')
		.select('id, title_ko, description_ko, tags')
		.order('id', { ascending: true });

	if (allPosts) {
		allPosts.forEach((post, idx) => {
			console.log(`\n${idx + 1}. [ID: ${post.id}] ${post.title_ko}`);
			console.log(`   설명: ${post.description_ko?.slice(0, 60)}...`);
			console.log(`   태그: ${post.tags?.join(', ') || '없음'}`);
		});
	}

	// 3. Keyword 검색
	console.log('\n\n📊 Keyword 검색 결과:');
	console.log('='.repeat(60));

	const searchTerm = `%${query}%`;
	const { data: keywordResults } = await supabase
		.from('posts')
		.select('id, title_ko, description_ko')
		.or(`title_ko.ilike.${searchTerm},description_ko.ilike.${searchTerm}`)
		.limit(5);

	if (keywordResults && keywordResults.length > 0) {
		keywordResults.forEach((item, idx) => {
			console.log(`\n${idx + 1}. [ID: ${item.id}] ${item.title_ko}`);
		});
	} else {
		console.log(`"${query}" 키워드 매칭 결과 없음`);
	}

	console.log('\n');
	console.log('💡 참고: Vector 검색은 쿼리 임베딩이 필요합니다.');
	console.log(
		'   챗봇 API에서는 blogService.semanticSearch()가 자동으로 처리합니다.',
	);
}

main().catch((err) => {
	console.error('❌ 에러:', err);
	process.exit(1);
});
