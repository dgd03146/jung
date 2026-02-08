import { resolve } from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import {
	GeminiTranslator,
	RateLimitError,
} from '../packages/ai-translator/src';

// Load .env from project root
config({ path: resolve(__dirname, '../.env') });

// Environment validation
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !GEMINI_API_KEY) {
	console.error('❌ Missing required environment variables:');
	console.error('   - SUPABASE_URL');
	console.error('   - SUPABASE_SERVICE_ROLE_KEY');
	console.error('   - GEMINI_API_KEY');
	process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const translator = new GeminiTranslator(GEMINI_API_KEY);

// Rate limit delay (15 RPM = 4 seconds per request)
const RATE_LIMIT_DELAY = 4000;

async function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function translateTags(tags: string[] | null): Promise<string[] | null> {
	if (!tags || tags.length === 0) return null;

	const translatedTags: string[] = [];
	for (const tag of tags) {
		const translated = await translator.translate(tag, 'ko', 'en');
		translatedTags.push(translated.trim());
		await delay(RATE_LIMIT_DELAY);
	}
	return translatedTags;
}

const BATCH_SIZE = 1000;

async function fetchAllPhotos() {
	const allPhotos: Record<string, unknown>[] = [];

	let from = 0;
	while (true) {
		const { data, error } = await supabase
			.from('photos')
			.select('id, title, description, tags, title_en, description_en, tags_en')
			.order('created_at', { ascending: false })
			.range(from, from + BATCH_SIZE - 1);

		if (error) {
			console.error(`❌ Failed to fetch photos (offset ${from}):`, error);
			process.exit(1);
		}

		if (!data || data.length === 0) break;

		allPhotos.push(...data);
		console.log(`   📥 Fetched ${allPhotos.length} photos so far...`);

		if (data.length < BATCH_SIZE) break;
		from += BATCH_SIZE;
	}

	return allPhotos;
}

async function migrateAllPhotos() {
	console.log('🚀 Starting photo translation migration...\n');

	// 1. Fetch all photos (paginated)
	const photos = await fetchAllPhotos();

	if (photos.length === 0) {
		console.log('ℹ️  No photos found.');
		return;
	}

	console.log(`📊 Found ${photos.length} photos to process\n`);

	let successCount = 0;
	let skipCount = 0;
	let errorCount = 0;

	// 2. Translate each photo
	for (const [i, photo] of photos.entries()) {
		const progress = `[${i + 1}/${photos.length}]`;

		// Skip if already fully translated
		const hasTranslatedTags =
			Array.isArray(photo.tags_en) && photo.tags_en.length > 0;
		const hasTags = Array.isArray(photo.tags) && photo.tags.length > 0;
		const isFullyTranslated =
			photo.title_en && photo.description_en && (!hasTags || hasTranslatedTags);

		if (isFullyTranslated) {
			console.log(
				`⏭️  ${progress} Skipping (already translated): ${photo.title || photo.id}`,
			);
			skipCount++;
			continue;
		}

		console.log(`🔄 ${progress} Translating: ${photo.title || photo.id}`);

		try {
			// Translate title
			let title_en = photo.title_en;
			if (!title_en && photo.title) {
				title_en = await translator.translate(photo.title, 'ko', 'en');
				await delay(RATE_LIMIT_DELAY);
			}

			// Translate description
			let description_en = photo.description_en;
			if (!description_en && photo.description) {
				description_en = await translator.translate(
					photo.description,
					'ko',
					'en',
				);
				await delay(RATE_LIMIT_DELAY);
			}

			// Translate tags
			let tags_en = photo.tags_en;
			if ((!tags_en || tags_en.length === 0) && hasTags) {
				tags_en = await translateTags(photo.tags);
			}

			// Update photo
			const { error: updateError } = await supabase
				.from('photos')
				.update({
					title_en,
					description_en,
					tags_en,
				})
				.eq('id', photo.id);

			if (updateError) {
				throw updateError;
			}

			console.log(`   ✅ Success: "${title_en || '(no title)'}"\n`);
			successCount++;

			// Additional rate limit delay between photos
			if (i < photos.length - 1) {
				console.log('   ⏳ Waiting 4s (rate limit)...\n');
				await delay(RATE_LIMIT_DELAY);
			}
		} catch (error) {
			if (error instanceof RateLimitError) {
				console.error('🛑 Rate limit reached. Stopping migration.');
				console.error(`   Last photo: ${photo.title || photo.id}`);
				process.exit(1);
			}

			const message = error instanceof Error ? error.message : String(error);
			console.error(`   ❌ Error translating photo ${photo.id}:`, message);
			errorCount++;
			console.log('   ⏭️  Continuing to next photo...\n');
		}
	}

	// 3. Summary
	console.log('═'.repeat(60));
	console.log('🎉 Photo Migration Complete!\n');
	console.log('📈 Summary:');
	console.log(`   ✅ Successfully translated: ${successCount}`);
	console.log(`   ⏭️  Skipped (already done): ${skipCount}`);
	console.log(`   ❌ Errors: ${errorCount}`);
	console.log(`   📊 Total: ${photos.length}`);
	console.log('═'.repeat(60));

	process.exit(errorCount > 0 ? 1 : 0);
}

// Run migration
migrateAllPhotos().catch((error) => {
	console.error('💥 Migration failed:', error);
	process.exit(1);
});
