import { resolve } from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load .env from project root
config({ path: resolve(__dirname, '../.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
	console.error('❌ Missing required environment variables');
	process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function checkCodeBlocks() {
	console.log('🔍 Checking for code blocks in blog posts...\n');

	const { data: posts, error } = await supabase
		.from('posts')
		.select('id, title, content, content_ko')
		.order('date', { ascending: false })
		.limit(5);

	if (error) {
		console.error('❌ Error:', error);
		process.exit(1);
	}

	if (!posts || posts.length === 0) {
		console.log('ℹ️  No posts found');
		return;
	}

	console.log(`Found ${posts.length} posts\n`);

	for (const post of posts) {
		console.log(`\n📝 Post: ${post.title}`);
		console.log(`   ID: ${post.id}`);

		const content = post.content_ko || post.content;

		if (!content) {
			console.log('   ⚠️  No content');
			continue;
		}

		// Check if content has code blocks
		const contentStr = JSON.stringify(content);
		const hasCodeBlock =
			contentStr.includes('"type":"codeBlock"') ||
			contentStr.includes('"type":"code"');

		console.log(`   Code blocks: ${hasCodeBlock ? '✅ YES' : '❌ NO'}`);

		if (hasCodeBlock) {
			// Show first code block structure
			try {
				const blocks = Array.isArray(content)
					? content
					: (content as { content?: unknown[] }).content || [];
				const codeBlock = blocks.find(
					(b: { type?: string }) => b.type === 'codeBlock' || b.type === 'code',
				);

				if (codeBlock) {
					console.log(`   Language: ${codeBlock.attrs?.language || 'none'}`);
					console.log(
						`   Content preview: ${JSON.stringify(codeBlock).substring(0, 100)}...`,
					);
				}
			} catch (e) {
				console.log(`   ⚠️  Could not parse: ${e}`);
			}
		}
	}
}

checkCodeBlocks().catch(console.error);
