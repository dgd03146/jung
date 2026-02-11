import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(
	process.env.SUPABASE_URL || '',
	process.env.SUPABASE_SERVICE_ROLE_KEY || '',
);

async function main() {
	const { data: posts, error } = await supabase
		.from('posts')
		.select('id, title_ko, description_ko, tags')
		.order('date', { ascending: false });

	if (error) {
		console.error('에러:', error.message);
		process.exit(1);
	}

	console.log('📝 포스트 목록:\n');
	for (const post of posts || []) {
		console.log(`ID: ${post.id}`);
		console.log(`제목: ${post.title_ko}`);
		console.log(`설명: ${post.description_ko?.slice(0, 50)}...`);
		console.log(`태그: ${post.tags?.join(', ')}`);
		console.log('---');
	}
}

main();
