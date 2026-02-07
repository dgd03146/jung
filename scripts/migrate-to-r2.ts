/**
 * Supabase Storage → Cloudflare R2 마이그레이션 스크립트
 *
 * 기존 Supabase URL을 R2 key로 변환합니다.
 *
 * 사용법:
 *   pnpm tsx scripts/migrate-to-r2.ts
 *
 * 환경변수:
 *   - SUPABASE_URL: Supabase URL
 *   - SUPABASE_SERVICE_ROLE_KEY: Supabase 서비스 역할 키
 *   - R2_ENDPOINT: Cloudflare R2 엔드포인트
 *   - R2_ACCESS_KEY_ID: R2 액세스 키 ID
 *   - R2_SECRET_ACCESS_KEY: R2 시크릿 액세스 키
 *   - R2_BUCKET: R2 버킷 이름
 *
 * 작업 단계:
 *   1. photos 테이블: image_url (Supabase URL → R2 key)
 *   2. collections 테이블: cover_image (Supabase URL → R2 key)
 *   3. posts 테이블: imagesrc (Supabase URL → R2 key)
 *   4. places 테이블: photos[].url (Supabase URL → R2 key)
 */

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// ===== 설정 =====

const DELAY_MS = 500;

// ===== 클라이언트 초기화 =====

const supabase = createClient(
	process.env.SUPABASE_URL || '',
	process.env.SUPABASE_SERVICE_ROLE_KEY || '',
);

const R2 = new S3Client({
	region: 'auto',
	endpoint: process.env.R2_ENDPOINT,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
	},
});

const BUCKET = process.env.R2_BUCKET || 'jung-images';

// ===== 유틸리티 함수 =====

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function isSupabaseUrl(url: string): boolean {
	return url.includes('supabase.co/storage');
}

function extractFilename(url: string): string {
	const parts = url.split('/');
	return parts[parts.length - 1] || '';
}

async function downloadFromSupabase(url: string): Promise<Buffer> {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to download: ${url}`);
	}
	return Buffer.from(await response.arrayBuffer());
}

async function uploadToR2(
	key: string,
	data: Buffer,
	contentType: string,
): Promise<void> {
	const command = new PutObjectCommand({
		Bucket: BUCKET,
		Key: key,
		Body: data,
		ContentType: contentType,
	});
	await R2.send(command);
}

function getContentType(filename: string): string {
	const ext = filename.split('.').pop()?.toLowerCase();
	const types: Record<string, string> = {
		jpg: 'image/jpeg',
		jpeg: 'image/jpeg',
		png: 'image/png',
		gif: 'image/gif',
		webp: 'image/webp',
		avif: 'image/avif',
	};
	return types[ext || ''] || 'application/octet-stream';
}

// ===== 마이그레이션 함수 =====

async function migratePhotos(): Promise<void> {
	console.log('\n📷 photos 테이블 마이그레이션 시작...');

	const { data: photos, error } = await supabase
		.from('photos')
		.select('id, image_url')
		.like('image_url', '%supabase.co%');

	if (error) {
		console.error('photos 조회 실패:', error);
		return;
	}

	console.log(`  총 ${photos?.length || 0}개 이미지 발견`);

	for (const photo of photos || []) {
		if (!isSupabaseUrl(photo.image_url)) continue;

		try {
			const filename = extractFilename(photo.image_url);
			const key = `gallery/${crypto.randomUUID()}.${filename.split('.').pop()}`;

			// 다운로드 → R2 업로드
			const data = await downloadFromSupabase(photo.image_url);
			await uploadToR2(key, data, getContentType(filename));

			// DB 업데이트
			await supabase
				.from('photos')
				.update({ image_url: key })
				.eq('id', photo.id);

			console.log(`  ✅ ${photo.id}: ${key}`);
			await delay(DELAY_MS);
		} catch (err) {
			console.error(`  ❌ ${photo.id}: ${err}`);
		}
	}
}

async function migrateCollections(): Promise<void> {
	console.log('\n📁 collections 테이블 마이그레이션 시작...');

	const { data: collections, error } = await supabase
		.from('collections')
		.select('id, cover_image')
		.like('cover_image', '%supabase.co%');

	if (error) {
		console.error('collections 조회 실패:', error);
		return;
	}

	console.log(`  총 ${collections?.length || 0}개 이미지 발견`);

	for (const collection of collections || []) {
		if (!isSupabaseUrl(collection.cover_image)) continue;

		try {
			const filename = extractFilename(collection.cover_image);
			const key = `gallery/${crypto.randomUUID()}.${filename.split('.').pop()}`;

			const data = await downloadFromSupabase(collection.cover_image);
			await uploadToR2(key, data, getContentType(filename));

			await supabase
				.from('collections')
				.update({ cover_image: key })
				.eq('id', collection.id);

			console.log(`  ✅ ${collection.id}: ${key}`);
			await delay(DELAY_MS);
		} catch (err) {
			console.error(`  ❌ ${collection.id}: ${err}`);
		}
	}
}

async function migratePosts(): Promise<void> {
	console.log('\n📝 posts 테이블 마이그레이션 시작...');

	const { data: posts, error } = await supabase
		.from('posts')
		.select('id, imagesrc')
		.like('imagesrc', '%supabase.co%');

	if (error) {
		console.error('posts 조회 실패:', error);
		return;
	}

	console.log(`  총 ${posts?.length || 0}개 이미지 발견`);

	for (const post of posts || []) {
		if (!isSupabaseUrl(post.imagesrc)) continue;

		try {
			const filename = extractFilename(post.imagesrc);
			const key = `blog/${crypto.randomUUID()}.${filename.split('.').pop()}`;

			const data = await downloadFromSupabase(post.imagesrc);
			await uploadToR2(key, data, getContentType(filename));

			await supabase.from('posts').update({ imagesrc: key }).eq('id', post.id);

			console.log(`  ✅ ${post.id}: ${key}`);
			await delay(DELAY_MS);
		} catch (err) {
			console.error(`  ❌ ${post.id}: ${err}`);
		}
	}
}

interface PlacePhoto {
	url: string;
	alt?: string;
}

async function migratePlaces(): Promise<void> {
	console.log('\n📍 places 테이블 마이그레이션 시작...');

	const { data: places, error } = await supabase
		.from('places')
		.select('id, photos');

	if (error) {
		console.error('places 조회 실패:', error);
		return;
	}

	let migratedCount = 0;

	for (const place of places || []) {
		const photos: PlacePhoto[] = place.photos || [];
		const hasSupabaseUrls = photos.some((p) => isSupabaseUrl(p.url));

		if (!hasSupabaseUrls) continue;

		try {
			const newPhotos: PlacePhoto[] = [];

			for (const photo of photos) {
				if (!isSupabaseUrl(photo.url)) {
					newPhotos.push(photo);
					continue;
				}

				const filename = extractFilename(photo.url);
				const key = `places/${crypto.randomUUID()}.${filename.split('.').pop()}`;

				const data = await downloadFromSupabase(photo.url);
				await uploadToR2(key, data, getContentType(filename));

				newPhotos.push({ ...photo, url: key });
				await delay(DELAY_MS);
			}

			await supabase
				.from('places')
				.update({ photos: newPhotos })
				.eq('id', place.id);

			console.log(`  ✅ ${place.id}: ${newPhotos.length}개 이미지`);
			migratedCount++;
		} catch (err) {
			console.error(`  ❌ ${place.id}: ${err}`);
		}
	}

	console.log(`  총 ${migratedCount}개 장소 마이그레이션 완료`);
}

// ===== 메인 =====

async function main(): Promise<void> {
	console.log('🚀 Supabase → R2 마이그레이션 시작\n');
	console.log(`R2 Bucket: ${BUCKET}`);
	console.log(`R2 Endpoint: ${process.env.R2_ENDPOINT}`);

	await migratePhotos();
	await migrateCollections();
	await migratePosts();
	await migratePlaces();

	console.log('\n✨ 마이그레이션 완료!');
}

main().catch(console.error);
