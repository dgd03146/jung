/**
 * 임베딩 상태 확인 스크립트
 *
 * 사용법:
 *   pnpm tsx scripts/check-embeddings.ts
 */

import { resolve } from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// .env.local 파일 로드 (apps/web 우선)
const webEnvPath = resolve(process.cwd(), 'apps/web/.env.local');
const rootEnvPath = resolve(process.cwd(), '.env.local');

config({ path: webEnvPath });
config({ path: rootEnvPath });

async function main() {
	console.log('📊 임베딩 상태 확인\n');

	const supabaseUrl =
		process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseKey =
		process.env.SUPABASE_SERVICE_ROLE_KEY ||
		process.env.SUPABASE_ANON_KEY ||
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseKey) {
		console.error('❌ Supabase 환경변수가 설정되지 않았습니다.');
		console.error('   SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
		console.error('   SUPABASE_KEY:', supabaseKey ? '✅' : '❌');
		console.error('\n환경변수 파일 확인:');
		console.error(`   - ${webEnvPath}`);
		console.error(`   - ${rootEnvPath}`);
		process.exit(1);
	}

	const supabase = createClient(supabaseUrl, supabaseKey);

	// 전체 포스트 수
	const { count: totalCount, error: totalError } = await supabase
		.from('posts')
		.select('*', { count: 'exact', head: true });

	if (totalError) {
		console.error('❌ 포스트 조회 실패:', totalError.message);
		process.exit(1);
	}

	// 임베딩이 있는 포스트 수
	const { count: embeddedCount, error: embeddedError } = await supabase
		.from('posts')
		.select('*', { count: 'exact', head: true })
		.not('embedding', 'is', null);

	if (embeddedError) {
		console.error('❌ 임베딩 포스트 조회 실패:', embeddedError.message);
		process.exit(1);
	}

	// 임베딩이 없는 포스트 목록
	const { data: missingPosts, error: missingError } = await supabase
		.from('posts')
		.select('id, title_ko')
		.is('embedding', null)
		.limit(10);

	if (missingError) {
		console.error('❌ 미싱 포스트 조회 실패:', missingError.message);
	}

	console.log('='.repeat(50));
	console.log(`📝 전체 포스트: ${totalCount}개`);
	console.log(`✅ 임베딩 있음: ${embeddedCount}개`);
	console.log(`❌ 임베딩 없음: ${(totalCount || 0) - (embeddedCount || 0)}개`);
	console.log('='.repeat(50));

	if (missingPosts && missingPosts.length > 0) {
		console.log('\n📋 임베딩 없는 포스트 (최대 10개):');
		missingPosts.forEach((post) => {
			console.log(`   - [${post.id}] ${post.title_ko?.slice(0, 40)}...`);
		});
		console.log('\n💡 임베딩 생성: pnpm tsx scripts/generate-embeddings.ts');
	} else {
		console.log('\n✅ 모든 포스트에 임베딩이 생성되어 있습니다!');
	}
}

main().catch((err) => {
	console.error('❌ 에러:', err);
	process.exit(1);
});
