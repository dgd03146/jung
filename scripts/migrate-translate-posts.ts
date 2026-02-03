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

async function migrateAllPosts() {
	console.log('🚀 Starting post translation migration...\n');

	// 1. Fetch all posts
	const { data: posts, error: fetchError } = await supabase
		.from('posts')
		.select(
			'id, title, description, content, tags, title_ko, title_en, description_en, content_en, tags_en',
		)
		.order('date', { ascending: false });

	if (fetchError) {
		console.error('❌ Failed to fetch posts:', fetchError);
		process.exit(1);
	}

	if (!posts || posts.length === 0) {
		console.log('ℹ️  No posts found.');
		return;
	}

	console.log(`📊 Found ${posts.length} posts to translate\n`);

	let successCount = 0;
	let skipCount = 0;
	let errorCount = 0;

	// 2. Translate each post
	for (const [i, post] of posts.entries()) {
		const progress = `[${i + 1}/${posts.length}]`;

		// Skip if already fully translated (including tags)
		const hasTranslatedTags =
			Array.isArray(post.tags_en) && post.tags_en.length > 0;
		const isFullyTranslated =
			post.title_en &&
			post.description_en &&
			post.content_en &&
			hasTranslatedTags;
		if (isFullyTranslated) {
			console.log(
				`⏭️  ${progress} Skipping (already translated): ${post.title}`,
			);
			skipCount++;
			continue;
		}

		console.log(`🔄 ${progress} Translating: ${post.title || post.id}`);

		try {
			// Translate title, description, content, and tags sequentially to respect rate limit
			// 15 RPM = 1 request per 4 seconds
			const title_en = await translator.translate(post.title, 'ko', 'en');
			await new Promise((resolve) => setTimeout(resolve, 4000));

			const description_en = await translator.translate(
				post.description,
				'ko',
				'en',
			);
			await new Promise((resolve) => setTimeout(resolve, 4000));

			const content_en = await translator.translateJSON(
				post.content,
				'ko',
				'en',
			);
			await new Promise((resolve) => setTimeout(resolve, 4000));

			// Translate tags individually to preserve one-to-one mapping
			const tags_en: string[] = [];
			if (post.tags && post.tags.length > 0) {
				for (const tag of post.tags) {
					const translatedTag = await translator.translate(tag, 'ko', 'en');
					tags_en.push(translatedTag.trim());
					await new Promise((resolve) => setTimeout(resolve, 4000));
				}
			}

			// Update post
			const { error: updateError } = await supabase
				.from('posts')
				.update({
					title_ko: post.title_ko || post.title, // Keep original as Korean
					title_en,
					description_ko: post.description,
					description_en,
					content_ko: post.content,
					content_en,
					tags_en,
				})
				.eq('id', post.id);

			if (updateError) {
				throw updateError;
			}

			console.log(`   ✅ Success: "${title_en}"\n`);
			successCount++;

			// Rate limit: Gemini Free tier = 15 RPM = 4 seconds per request
			if (i < posts.length - 1) {
				console.log('   ⏳ Waiting 4s (rate limit)...\n');
				await new Promise((resolve) => setTimeout(resolve, 4000));
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);

			// Rate limit reached - stop completely to avoid charges
			if (message.includes('429') || message.includes('Resource Exhausted')) {
				console.error('🛑 Rate limit reached. Stopping migration.');
				console.error(`   Last post: ${post.title}`);
				process.exit(1);
			}

			console.error(`   ❌ Error translating post ${post.id}:`, message);
			errorCount++;
			console.log('   ⏭️  Continuing to next post...\n');
		}
	}

	// 3. Summary
	console.log('═'.repeat(60));
	console.log('🎉 Migration Complete!\n');
	console.log(`📈 Summary:`);
	console.log(`   ✅ Successfully translated: ${successCount}`);
	console.log(`   ⏭️  Skipped (already done): ${skipCount}`);
	console.log(`   ❌ Errors: ${errorCount}`);
	console.log(`   📊 Total: ${posts.length}`);
	console.log('═'.repeat(60));

	process.exit(errorCount > 0 ? 1 : 0);
}

// Run migration
migrateAllPosts().catch((error) => {
	console.error('💥 Migration failed:', error);
	process.exit(1);
});
