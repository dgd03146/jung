import { resolve } from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { GeminiTranslator } from '../packages/ai-translator/src';

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

async function translateArray(
	items: string[] | null,
): Promise<string[] | null> {
	if (!items || items.length === 0) return null;

	const translated: string[] = [];
	for (const item of items) {
		const result = await translator.translate(item, 'ko', 'en');
		translated.push(result.trim());
		await delay(RATE_LIMIT_DELAY);
	}
	return translated;
}

async function migrateAllSpots() {
	console.log('🚀 Starting spots translation migration...\n');

	// 1. Fetch all spots
	const { data: spots, error: fetchError } = await supabase
		.from('spots')
		.select(
			'id, title, description, address, tags, tips, title_en, description_en, address_en, tags_en, tips_en',
		)
		.order('created_at', { ascending: false });

	if (fetchError) {
		console.error('❌ Failed to fetch spots:', fetchError);
		process.exit(1);
	}

	if (!spots || spots.length === 0) {
		console.log('ℹ️  No spots found.');
		return;
	}

	console.log(`📊 Found ${spots.length} spots to process\n`);

	let successCount = 0;
	let skipCount = 0;
	let errorCount = 0;

	// 2. Translate each spot
	for (const [i, spot] of spots.entries()) {
		const progress = `[${i + 1}/${spots.length}]`;

		// Check if fully translated
		const hasTags = Array.isArray(spot.tags) && spot.tags.length > 0;
		const hasTips = Array.isArray(spot.tips) && spot.tips.length > 0;
		const hasTranslatedTags =
			Array.isArray(spot.tags_en) && spot.tags_en.length > 0;
		const hasTranslatedTips =
			Array.isArray(spot.tips_en) && spot.tips_en.length > 0;

		const isFullyTranslated =
			spot.title_en &&
			spot.description_en &&
			spot.address_en &&
			(!hasTags || hasTranslatedTags) &&
			(!hasTips || hasTranslatedTips);

		if (isFullyTranslated) {
			console.log(
				`⏭️  ${progress} Skipping (already translated): ${spot.title || spot.id}`,
			);
			skipCount++;
			continue;
		}

		console.log(`🔄 ${progress} Translating: ${spot.title || spot.id}`);

		try {
			// Translate title
			let title_en = spot.title_en;
			if (!title_en && spot.title) {
				title_en = await translator.translate(spot.title, 'ko', 'en');
				await delay(RATE_LIMIT_DELAY);
			}

			// Translate description
			let description_en = spot.description_en;
			if (!description_en && spot.description) {
				description_en = await translator.translate(
					spot.description,
					'ko',
					'en',
				);
				await delay(RATE_LIMIT_DELAY);
			}

			// Translate address
			let address_en = spot.address_en;
			if (!address_en && spot.address) {
				address_en = await translator.translate(spot.address, 'ko', 'en');
				await delay(RATE_LIMIT_DELAY);
			}

			// Translate tags
			let tags_en = spot.tags_en;
			if ((!tags_en || tags_en.length === 0) && hasTags) {
				tags_en = await translateArray(spot.tags);
			}

			// Translate tips
			let tips_en = spot.tips_en;
			if ((!tips_en || tips_en.length === 0) && hasTips) {
				tips_en = await translateArray(spot.tips);
			}

			// Update spot
			const { error: updateError } = await supabase
				.from('spots')
				.update({
					title_en,
					description_en,
					address_en,
					tags_en,
					tips_en,
				})
				.eq('id', spot.id);

			if (updateError) {
				throw updateError;
			}

			console.log(`   ✅ Success: "${title_en || '(no title)'}"\n`);
			successCount++;

			// Additional rate limit delay between spots
			if (i < spots.length - 1) {
				console.log('   ⏳ Waiting 4s (rate limit)...\n');
				await delay(RATE_LIMIT_DELAY);
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);

			// Rate limit reached - stop completely
			if (message.includes('429') || message.includes('Resource Exhausted')) {
				console.error('🛑 Rate limit reached. Stopping migration.');
				console.error(`   Last spot: ${spot.title || spot.id}`);
				process.exit(1);
			}

			console.error(`   ❌ Error translating spot ${spot.id}:`, message);
			errorCount++;
			console.log('   ⏭️  Continuing to next spot...\n');
		}
	}

	// 3. Summary
	console.log('═'.repeat(60));
	console.log('🎉 Spots Migration Complete!\n');
	console.log('📈 Summary:');
	console.log(`   ✅ Successfully translated: ${successCount}`);
	console.log(`   ⏭️  Skipped (already done): ${skipCount}`);
	console.log(`   ❌ Errors: ${errorCount}`);
	console.log(`   📊 Total: ${spots.length}`);
	console.log('═'.repeat(60));

	process.exit(errorCount > 0 ? 1 : 0);
}

// Run migration
migrateAllSpots().catch((error) => {
	console.error('💥 Migration failed:', error);
	process.exit(1);
});
