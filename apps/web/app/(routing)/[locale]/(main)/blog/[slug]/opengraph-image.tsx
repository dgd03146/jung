import { createClient } from '@supabase/supabase-js';
import { ImageResponse } from 'next/og';

export const dynamic = 'force-dynamic';

const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;
const CONTAINER_PADDING = 60;

const FONT_SIZE = {
	DEFAULT_TITLE: 48,
	CATEGORY: 24,
	POST_TITLE: 56,
	AUTHOR: 32,
	SITE_URL: 20,
} as const;

const COLORS = {
	DEFAULT_BG: '#1a1a1a',
	POST_BG: '#0a0a0a',
	WHITE: '#ffffff',
	CATEGORY_TEXT: 'rgba(255, 255, 255, 0.6)',
	SITE_URL_TEXT: 'rgba(255, 255, 255, 0.5)',
	GRADIENT: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
} as const;

const TITLE_MAX_LINES = 3;

export const alt = 'JUNG Blog';
export const size = { width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT };
export const contentType = 'image/png';

const createDefaultImage = () =>
	new ImageResponse(
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: COLORS.DEFAULT_BG,
				color: COLORS.WHITE,
				fontSize: FONT_SIZE.DEFAULT_TITLE,
				fontWeight: 'bold',
			}}
		>
			JUNG Blog
		</div>,
		size,
	);

export default async function Image({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseKey) {
		return createDefaultImage();
	}

	try {
		const supabase = createClient(supabaseUrl, supabaseKey);
		const { data: post } = await supabase
			.from('posts')
			.select('title, category')
			.eq('id', slug)
			.single();

		if (!post) {
			return createDefaultImage();
		}

		return new ImageResponse(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: CONTAINER_PADDING,
					backgroundColor: COLORS.POST_BG,
					backgroundImage: COLORS.GRADIENT,
				}}
			>
				<div
					style={{
						fontSize: FONT_SIZE.CATEGORY,
						color: COLORS.CATEGORY_TEXT,
						textTransform: 'uppercase',
						letterSpacing: '0.15em',
						fontWeight: 500,
					}}
				>
					{post.category}
				</div>

				<div
					style={{
						fontSize: FONT_SIZE.POST_TITLE,
						fontWeight: 700,
						color: COLORS.WHITE,
						lineHeight: 1.2,
						maxWidth: '90%',
						display: '-webkit-box',
						WebkitLineClamp: TITLE_MAX_LINES,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
					}}
				>
					{post.title}
				</div>

				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<div
						style={{
							fontSize: FONT_SIZE.AUTHOR,
							color: COLORS.WHITE,
							fontWeight: 700,
							letterSpacing: '0.05em',
						}}
					>
						JUNG.
					</div>
					<div
						style={{
							fontSize: FONT_SIZE.SITE_URL,
							color: COLORS.SITE_URL_TEXT,
						}}
					>
						geojung.com
					</div>
				</div>
			</div>,
			{
				...size,
			},
		);
	} catch {
		return createDefaultImage();
	}
}
