/**
 * 전체 컨텐츠 임베딩 생성 스크립트
 *
 * 사용법:
 *   pnpm tsx scripts/generate-embeddings.ts [--posts] [--photos] [--places] [--all]
 *
 * 옵션:
 *   --posts  블로그 포스트만
 *   --photos 갤러리 사진만
 *   --places  장소만
 *   --all    전체 (기본값)
 *   --force  기존 임베딩이 있는 항목도 재생성
 *
 * 환경변수:
 *   - GEMINI_API_KEY: Gemini API 키
 *   - SUPABASE_URL: Supabase URL
 *   - SUPABASE_SERVICE_ROLE_KEY: Supabase 서비스 역할 키
 */

import { resolve } from 'node:path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { EMBEDDING_MODEL } from '../packages/api/lib/constants';
import {
	extractTextFromBlockNote,
	truncateText,
} from '../packages/api/lib/extractText';

// 환경변수 로드 (.local이 우선, dotenv는 이미 설정된 값을 덮어쓰지 않음)
config({ path: resolve(process.cwd(), 'apps/web/.env.local') });
config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), 'apps/web/.env') });
config({ path: resolve(process.cwd(), '.env') });

// ===== 설정 =====

const DELAY_MS = 200; // API 요청 간 딜레이 (rate limit 방지)

// ===== 클라이언트 초기화 =====

const supabaseUrl =
	process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// Service role key is REQUIRED for write operations (embedding updates)
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
const genAI = new GoogleGenerativeAI(
	process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY || '',
);

// ===== 유틸리티 함수 =====

async function generateEmbedding(text: string): Promise<number[]> {
	const model = genAI.getGenerativeModel({ model: EMBEDDING_MODEL });
	const result = await model.embedContent({
		content: { parts: [{ text }], role: 'user' },
		taskType: 'RETRIEVAL_DOCUMENT',
	});
	return result.embedding.values;
}

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// ===== 텍스트 준비 함수 =====

function preparePostText(post: {
	title_ko?: string;
	title_en?: string;
	description_ko?: string;
	description_en?: string;
	content_ko?: unknown;
	content_en?: unknown;
	tags?: string[];
}): string {
	const parts: string[] = [];
	if (post.title_ko) parts.push(post.title_ko);
	if (post.title_en && post.title_en !== post.title_ko)
		parts.push(post.title_en);
	if (post.description_ko) parts.push(post.description_ko);
	if (post.description_en && post.description_en !== post.description_ko) {
		parts.push(post.description_en);
	}

	// 본문 텍스트 (BlockNote JSON → 순수 텍스트, truncate)
	const bodyKo = extractTextFromBlockNote(post.content_ko);
	const bodyEn = extractTextFromBlockNote(post.content_en);
	if (bodyKo) parts.push(truncateText(bodyKo, 2000));
	if (bodyEn && bodyEn !== bodyKo) parts.push(truncateText(bodyEn, 1000));

	if (post.tags?.length) parts.push(post.tags.join(' '));
	return parts.join('\n');
}

function preparePhotoText(photo: {
	description?: string;
	description_en?: string;
	tags?: string[];
	tags_en?: string[];
}): string {
	const parts: string[] = [];
	if (photo.description) parts.push(photo.description);
	if (photo.description_en && photo.description_en !== photo.description) {
		parts.push(photo.description_en);
	}
	if (photo.tags?.length) parts.push(photo.tags.join(' '));
	if (photo.tags_en?.length) parts.push(photo.tags_en.join(' '));
	return parts.join('\n');
}

function preparePlaceText(place: {
	title?: string;
	title_en?: string;
	description?: string;
	description_en?: string;
	address?: string;
	address_en?: string;
	tags?: string[];
	tags_en?: string[];
}): string {
	const parts: string[] = [];
	if (place.title) parts.push(place.title);
	if (place.title_en && place.title_en !== place.title)
		parts.push(place.title_en);
	if (place.description) parts.push(place.description);
	if (place.description_en && place.description_en !== place.description) {
		parts.push(place.description_en);
	}
	if (place.address) parts.push(place.address);
	if (place.tags?.length) parts.push(place.tags.join(' '));
	return parts.join('\n');
}

// ===== 임베딩 생성 함수 =====

async function generatePostEmbeddings(force = false): Promise<{
	success: number;
	error: number;
}> {
	console.log('\n📝 Posts 임베딩 생성 시작...\n');

	let query = supabase
		.from('posts')
		.select(
			'id, title_ko, title_en, description_ko, description_en, content_ko, content_en, tags',
		);

	if (!force) {
		query = query.is('embedding', null);
	}

	const { data: posts, error } = await query;

	if (error) {
		console.error('❌ 포스트 조회 실패:', error.message);
		return { success: 0, error: 1 };
	}

	if (!posts?.length) {
		console.log('✅ 모든 포스트에 이미 임베딩이 있습니다.');
		return { success: 0, error: 0 };
	}

	console.log(`📝 대상: ${posts.length}개 포스트\n`);

	let success = 0;
	let errorCount = 0;

	for (let i = 0; i < posts.length; i++) {
		const post = posts[i];
		if (!post) continue;
		const progress = `[${i + 1}/${posts.length}]`;

		try {
			const text = preparePostText(post);
			if (!text.trim()) {
				console.log(`${progress} ⚠️  빈 텍스트: ID ${post.id}`);
				continue;
			}

			const embedding = await generateEmbedding(text);
			const { error: updateError } = await supabase
				.from('posts')
				.update({ embedding })
				.eq('id', post.id);

			if (updateError) throw updateError;

			console.log(`${progress} ✅ ${post.title_ko?.slice(0, 40) || post.id}`);
			success++;
			await delay(DELAY_MS);
		} catch (_err) {
			console.log(
				`${progress} ❌ 실패: ${post.title_ko?.slice(0, 30) || post.id}`,
			);
			errorCount++;
			await delay(DELAY_MS * 5);
		}
	}

	return { success, error: errorCount };
}

async function generatePhotoEmbeddings(): Promise<{
	success: number;
	error: number;
}> {
	console.log('\n📷 Photos 임베딩 생성 시작...\n');

	const { data: photos, error } = await supabase
		.from('photos')
		.select('id, description, description_en, tags, tags_en')
		.is('embedding', null);

	if (error) {
		console.error('❌ 사진 조회 실패:', error.message);
		return { success: 0, error: 1 };
	}

	if (!photos?.length) {
		console.log('✅ 모든 사진에 이미 임베딩이 있습니다.');
		return { success: 0, error: 0 };
	}

	console.log(`📷 대상: ${photos.length}개 사진\n`);

	let success = 0;
	let errorCount = 0;

	for (let i = 0; i < photos.length; i++) {
		const photo = photos[i];
		const progress = `[${i + 1}/${photos.length}]`;

		try {
			const text = preparePhotoText(photo);
			if (!text.trim()) {
				console.log(`${progress} ⚠️  빈 텍스트: ID ${photo.id}`);
				continue;
			}

			const embedding = await generateEmbedding(text);
			const { error: updateError } = await supabase
				.from('photos')
				.update({ embedding })
				.eq('id', photo.id);

			if (updateError) throw updateError;

			console.log(
				`${progress} ✅ ${photo.description?.slice(0, 40) || photo.id}`,
			);
			success++;
			await delay(DELAY_MS);
		} catch (err) {
			console.log(`${progress} ❌ 실패: ID ${photo.id}`);
			console.error(`   에러:`, err);
			errorCount++;
			await delay(DELAY_MS * 5);
		}
	}

	return { success, error: errorCount };
}

async function generatePlaceEmbeddings(): Promise<{
	success: number;
	error: number;
}> {
	console.log('\n📍 Places 임베딩 생성 시작...\n');

	const { data: places, error } = await supabase
		.from('places')
		.select(
			'id, title, title_en, description, description_en, address, address_en, tags, tags_en',
		)
		.is('embedding', null);

	if (error) {
		console.error('❌ 장소 조회 실패:', error.message);
		return { success: 0, error: 1 };
	}

	if (!places?.length) {
		console.log('✅ 모든 장소에 이미 임베딩이 있습니다.');
		return { success: 0, error: 0 };
	}

	console.log(`📍 대상: ${places.length}개 장소\n`);

	let success = 0;
	let errorCount = 0;

	for (let i = 0; i < places.length; i++) {
		const place = places[i];
		const progress = `[${i + 1}/${places.length}]`;

		try {
			const text = preparePlaceText(place);
			if (!text.trim()) {
				console.log(`${progress} ⚠️  빈 텍스트: ID ${place.id}`);
				continue;
			}

			const embedding = await generateEmbedding(text);
			const { error: updateError } = await supabase
				.from('places')
				.update({ embedding })
				.eq('id', place.id);

			if (updateError) throw updateError;

			console.log(`${progress} ✅ ${place.title?.slice(0, 40) || place.id}`);
			success++;
			await delay(DELAY_MS);
		} catch (_err) {
			console.log(
				`${progress} ❌ 실패: ${place.title?.slice(0, 30) || place.id}`,
			);
			errorCount++;
			await delay(DELAY_MS * 5);
		}
	}

	return { success, error: errorCount };
}

// ===== 메인 실행 =====

async function main() {
	console.log('🚀 임베딩 생성 시작\n');
	console.log('='.repeat(50));

	// 환경변수 확인
	if (
		!process.env.GOOGLE_GENERATIVE_AI_API_KEY &&
		!process.env.GEMINI_API_KEY
	) {
		console.error(
			'❌ GOOGLE_GENERATIVE_AI_API_KEY 환경변수가 설정되지 않았습니다.',
		);
		process.exit(1);
	}

	if (!supabaseUrl) {
		console.error('❌ SUPABASE_URL 환경변수가 설정되지 않았습니다.');
		process.exit(1);
	}

	if (!supabaseServiceRoleKey) {
		console.error(
			'❌ SUPABASE_SERVICE_ROLE_KEY 환경변수가 설정되지 않았습니다.',
		);
		console.error(
			'   임베딩 업데이트에는 서비스 역할 키가 필요합니다. anon 키로는 쓰기 권한이 없습니다.',
		);
		process.exit(1);
	}

	// 옵션 파싱
	const args = process.argv.slice(2);
	const force = args.includes('--force');
	const noFlags =
		!args.includes('--posts') &&
		!args.includes('--photos') &&
		!args.includes('--places') &&
		!args.includes('--all');
	const runPosts =
		args.includes('--posts') || args.includes('--all') || noFlags;
	const runPhotos =
		args.includes('--photos') || args.includes('--all') || noFlags;
	const runPlaces =
		args.includes('--places') || args.includes('--all') || noFlags;

	if (force) {
		console.log('⚡ --force 모드: 기존 임베딩도 재생성합니다.\n');
	}

	const results = {
		posts: { success: 0, error: 0 },
		photos: { success: 0, error: 0 },
		places: { success: 0, error: 0 },
	};

	// 실행
	if (runPosts) results.posts = await generatePostEmbeddings(force);
	if (runPhotos) results.photos = await generatePhotoEmbeddings();
	if (runPlaces) results.places = await generatePlaceEmbeddings();

	// 결과 출력
	console.log(`\n${'='.repeat(50)}`);
	console.log('📊 임베딩 생성 완료');
	console.log('='.repeat(50));
	console.log(
		`📝 Posts:  ✅ ${results.posts.success} | ❌ ${results.posts.error}`,
	);
	console.log(
		`📷 Photos: ✅ ${results.photos.success} | ❌ ${results.photos.error}`,
	);
	console.log(
		`📍 Places:  ✅ ${results.places.success} | ❌ ${results.places.error}`,
	);

	const totalSuccess =
		results.posts.success + results.photos.success + results.places.success;
	const totalError =
		results.posts.error + results.photos.error + results.places.error;
	console.log('='.repeat(50));
	console.log(`📊 전체:   ✅ ${totalSuccess} | ❌ ${totalError}`);
}

main().catch((err) => {
	console.error('❌ 예상치 못한 에러:', err);
	process.exit(1);
});
