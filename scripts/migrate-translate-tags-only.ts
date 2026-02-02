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

async function migrateTagsOnly() {
	console.log('🏷️  Starting tags-only translation migration...\n');

	// 1. Fetch posts that have tags but no tags_en
	const { data: posts, error: fetchError } = await supabase
		.from('posts')
		.select('id, title, tags, tags_en')
		.not('tags', 'is', null)
		.is('tags_en', null)
		.order('date', { ascending: false });

	if (fetchError) {
		console.error('❌ Failed to fetch posts:', fetchError);
		process.exit(1);
	}

	if (!posts || posts.length === 0) {
		console.log('✅ All posts already have translated tags!');
		return;
	}

	console.log(`📊 Found ${posts.length} posts needing tag translation\n`);
	console.log(
		`📝 Estimated API requests: ${posts.length} (within 20/day free tier)\n`,
	);

	let successCount = 0;
	let skipCount = 0;
	let errorCount = 0;

	// 2. Translate tags for each post
	for (let i = 0; i < posts.length; i++) {
		const post = posts[i];
		const progress = `[${i + 1}/${posts.length}]`;

		// Skip if no tags or already has tags_en
		if (!post.tags || post.tags.length === 0) {
			console.log(`⏭️  ${progress} Skipping (no tags): ${post.title}`);
			skipCount++;
			continue;
		}

		if (post.tags_en && post.tags_en.length > 0) {
			console.log(
				`⏭️  ${progress} Skipping (already translated): ${post.title}`,
			);
			skipCount++;
			continue;
		}

		console.log(`🔄 ${progress} Translating tags for: ${post.title}`);
		console.log(`   Korean tags: [${post.tags.join(', ')}]`);

		try {
			// Translate tags (join as comma-separated, then split back)
			const tagsText = post.tags.join(', ');
			const translatedTags = await translator.translate(tagsText, 'ko', 'en');
			const tags_en = translatedTags
				.split(', ')
				.map((tag: string) => tag.trim());

			// Update post with translated tags
			const { error: updateError } = await supabase
				.from('posts')
				.update({ tags_en })
				.eq('id', post.id);

			if (updateError) {
				throw updateError;
			}

			console.log(`   ✅ English tags: [${tags_en.join(', ')}]\n`);
			successCount++;

			// Rate limit: 4 seconds between requests (15 RPM safe)
			if (i < posts.length - 1) {
				console.log('   ⏳ Waiting 4s (rate limit)...\n');
				await new Promise((resolve) => setTimeout(resolve, 4000));
			}
		} catch (error) {
			console.error(
				`   ❌ Error translating tags for post ${post.id}:`,
				error instanceof Error ? error.message : error,
			);
			errorCount++;
			console.log('   ⏭️  Continuing to next post...\n');
		}
	}

	// 3. Summary
	console.log('═'.repeat(60));
	console.log('🎉 Tags Migration Complete!\n');
	console.log(`📈 Summary:`);
	console.log(`   ✅ Successfully translated: ${successCount}`);
	console.log(`   ⏭️  Skipped: ${skipCount}`);
	console.log(`   ❌ Errors: ${errorCount}`);
	console.log(`   📊 Total: ${posts.length}`);
	console.log('═'.repeat(60));

	process.exit(errorCount > 0 ? 1 : 0);
}

// Run migration
migrateTagsOnly().catch((error) => {
	console.error('💥 Migration failed:', error);
	process.exit(1);
});
