import { createFileRoute } from '@tanstack/react-router';
import satori from 'satori';
import { SITE_CONFIG } from '../../config/site';

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const TITLE_LONG_THRESHOLD = 60;
const CACHE_MAX_AGE_SECONDS = 86_400;

let fontData: ArrayBuffer | null = null;
let fontBoldData: ArrayBuffer | null = null;

async function loadFont(): Promise<ArrayBuffer> {
	if (fontData) return fontData;
	const res = await fetch(
		'https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLGT9Z1JlFc-K.woff2',
	);
	if (!res.ok) {
		throw new Error(`Failed to load font: ${res.status}`);
	}
	fontData = await res.arrayBuffer();
	return fontData;
}

async function loadFontBold(): Promise<ArrayBuffer> {
	if (fontBoldData) return fontBoldData;
	const res = await fetch(
		'https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLCz7Z1JlFc-K.woff2',
	);
	if (!res.ok) {
		throw new Error(`Failed to load bold font: ${res.status}`);
	}
	fontBoldData = await res.arrayBuffer();
	return fontBoldData;
}

let wasmInitialized = false;

async function ensureWasmInitialized(): Promise<void> {
	if (wasmInitialized) return;

	const { initWasm } = await import('@resvg/resvg-wasm');
	try {
		const { readFile } = await import('node:fs/promises');
		const { createRequire } = await import('node:module');
		const require = createRequire(import.meta.url);
		const wasmPath = require.resolve('@resvg/resvg-wasm/index_bg.wasm');
		const wasmBuffer = await readFile(wasmPath);
		await initWasm(wasmBuffer);
	} catch (error) {
		if (
			!(error instanceof Error) ||
			!error.message.includes('Already initialized')
		) {
			throw error;
		}
	}
	wasmInitialized = true;
}

async function renderPng(svg: string): Promise<Uint8Array> {
	await ensureWasmInitialized();

	const { Resvg } = await import('@resvg/resvg-wasm');
	const resvg = new Resvg(svg, {
		fitTo: { mode: 'width', value: OG_WIDTH },
	});
	const pngData = resvg.render();
	return pngData.asPng();
}

function OgImage({ title, category }: { title: string; category: string }) {
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				padding: '60px 80px',
				background: 'linear-gradient(135deg, #0142C0 0%, #5B86E5 100%)',
				fontFamily: 'Poppins',
			}}
		>
			{category ? (
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<div
						style={{
							fontSize: '18px',
							fontWeight: 600,
							color: 'white',
							background: 'rgba(255,255,255,0.2)',
							padding: '6px 20px',
							borderRadius: '20px',
							textTransform: 'uppercase',
							letterSpacing: '0.1em',
						}}
					>
						{category}
					</div>
				</div>
			) : (
				<div />
			)}

			<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
				<div
					style={{
						fontSize: title.length > TITLE_LONG_THRESHOLD ? '42px' : '52px',
						fontWeight: 700,
						color: 'white',
						lineHeight: 1.2,
						maxWidth: '900px',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}
				>
					{title}
				</div>
			</div>

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					borderTop: '1px solid rgba(255,255,255,0.2)',
					paddingTop: '24px',
				}}
			>
				<div
					style={{
						fontSize: '20px',
						color: 'rgba(255,255,255,0.8)',
						fontWeight: 500,
					}}
				>
					{SITE_CONFIG.name}
				</div>
				<div
					style={{
						fontSize: '16px',
						color: 'rgba(255,255,255,0.5)',
					}}
				>
					{new URL(SITE_CONFIG.url).host}
				</div>
			</div>
		</div>
	);
}

export const Route = createFileRoute('/api/og')({
	component: () => null,
	server: {
		handlers: {
			GET: async ({ request }) => {
				try {
					const url = new URL(request.url);
					const title = url.searchParams.get('title') || SITE_CONFIG.name;
					const category = url.searchParams.get('category') || '';

					const [font, fontBold] = await Promise.all([
						loadFont(),
						loadFontBold(),
					]);

					const svg = await satori(
						<OgImage title={title} category={category} />,
						{
							width: OG_WIDTH,
							height: OG_HEIGHT,
							fonts: [
								{ name: 'Poppins', data: font, weight: 400, style: 'normal' },
								{
									name: 'Poppins',
									data: fontBold,
									weight: 700,
									style: 'normal',
								},
							],
						},
					);

					const png = await renderPng(svg);

					return new Response(png as unknown as BodyInit, {
						headers: {
							'Content-Type': 'image/png',
							'Cache-Control': `public, max-age=${CACHE_MAX_AGE_SECONDS}, s-maxage=${CACHE_MAX_AGE_SECONDS}`,
						},
					});
				} catch (error) {
					console.error('OG image generation failed:', error);
					return new Response('Internal Server Error', { status: 500 });
				}
			},
		},
	},
});
