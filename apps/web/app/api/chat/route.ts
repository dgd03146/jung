import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { escapePostgrestPattern } from '@jung/api/lib/constants';
import { supabase } from '@jung/api/lib/supabase';
import { blogService } from '@jung/api/services/blog';
import { galleryService } from '@jung/api/services/gallery';
import { placesService } from '@jung/api/services/place';
import {
	convertToModelMessages,
	stepCountIs,
	streamText,
	tool,
	type UIMessage,
} from 'ai';
import { z } from 'zod';
import { getLocalizedProfile } from '@/fsd/features/chatbot/config/profileData';
import { getSystemPrompt } from '@/fsd/features/chatbot/config/systemPrompt';

export const maxDuration = 30;

const RAG_SEARCH_LIMIT = 3;
const TOOL_SEARCH_LIMIT = 5;
const SUPPORTED_LOCALES = ['ko', 'en'] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

function extractLocale(req: Request): Locale {
	// 1. Referer URL의 /[locale]/ 세그먼트에서 추출
	const referer = req.headers.get('referer');
	if (referer) {
		try {
			const { pathname } = new URL(referer);
			const segment = pathname.split('/')[1];
			if (segment && SUPPORTED_LOCALES.includes(segment as Locale)) {
				return segment as Locale;
			}
		} catch {
			// invalid URL — fall through
		}
	}

	// 2. Accept-Language 헤더에서 추출
	const acceptLang = req.headers.get('accept-language') ?? '';
	for (const locale of SUPPORTED_LOCALES) {
		if (acceptLang.includes(locale)) {
			return locale;
		}
	}

	return 'ko';
}

const google = createGoogleGenerativeAI();

// RAG: 관련 컨텍스트 생성
const CONTEXT_LABELS = {
	ko: {
		blogs: '### 관련 블로그 글',
		places: '### 관련 장소',
		photos: '### 관련 사진',
		noData: '관련 데이터를 찾지 못했습니다.',
		header: '## 검색된 관련 정보',
	},
	en: {
		blogs: '### Related Blog Posts',
		places: '### Related Places',
		photos: '### Related Photos',
		noData: 'No related data found.',
		header: '## Related Information',
	},
} as const;

function buildContext(
	blogs: { items: Array<{ title: string; description: string }> },
	places: { items: Array<{ title: string; description: string }> },
	photos: { items: Array<{ description: string; tags: string[] }> },
	locale: Locale,
): string {
	const labels = CONTEXT_LABELS[locale];
	const parts: string[] = [];

	if (blogs.items.length > 0) {
		parts.push(labels.blogs);
		parts.push(
			blogs.items.map((b) => `- ${b.title}: ${b.description}`).join('\n'),
		);
	}

	if (places.items.length > 0) {
		parts.push(labels.places);
		parts.push(
			places.items.map((p) => `- ${p.title}: ${p.description}`).join('\n'),
		);
	}

	if (photos.items.length > 0) {
		parts.push(labels.photos);
		parts.push(
			photos.items
				.map((p) => `- ${p.description || p.tags?.join(', ')}`)
				.join('\n'),
		);
	}

	return parts.length > 0 ? parts.join('\n\n') : labels.noData;
}

const VALID_ROLES = ['user', 'assistant', 'system'] as const;

function isValidPart(part: unknown): boolean {
	if (typeof part !== 'object' || part === null) return false;
	const p = part as { type?: unknown };
	return typeof p.type === 'string';
}

function isValidMessage(msg: unknown): msg is UIMessage {
	if (typeof msg !== 'object' || msg === null) return false;

	const m = msg as Record<string, unknown>;

	// Validate id: non-empty string
	if (typeof m.id !== 'string' || m.id.trim().length === 0) return false;

	// Validate role: must be one of allowed values
	if (
		typeof m.role !== 'string' ||
		!VALID_ROLES.includes(m.role as (typeof VALID_ROLES)[number])
	) {
		return false;
	}

	// Validate parts: must be array with valid part objects
	if (!Array.isArray(m.parts)) return false;
	if (m.parts.length > 0 && !m.parts.every(isValidPart)) return false;

	return true;
}

export async function POST(req: Request) {
	let body: unknown;
	try {
		body = await req.json();
	} catch {
		return new Response('Invalid JSON', { status: 400 });
	}

	const locale = extractLocale(req);
	const messages = (body as { messages?: unknown })?.messages;

	if (!Array.isArray(messages) || messages.length === 0) {
		return new Response('messages must be a non-empty array', { status: 400 });
	}

	if (!messages.every(isValidMessage)) {
		return new Response(
			'Each message must have id, role (user|assistant|system), and parts',
			{ status: 400 },
		);
	}

	// Extract last user message for RAG search
	const lastUserMessage = messages.filter((m) => m.role === 'user').pop();
	const query =
		lastUserMessage?.parts
			?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
			.map((p) => p.text)
			.join(' ')
			.trim() || '';

	// RAG: Skip semantic search if query is empty
	const emptyResults = { items: [] };
	const [blogResults, placeResults, photoResults] = query
		? await Promise.all([
				blogService
					.semanticSearch({
						query,
						limit: RAG_SEARCH_LIMIT,
						mode: 'hybrid',
						locale,
					})
					.catch(() => emptyResults),
				placesService
					.semanticSearch({ query, limit: RAG_SEARCH_LIMIT, mode: 'hybrid' })
					.catch(() => emptyResults),
				galleryService
					.semanticSearch({ query, limit: RAG_SEARCH_LIMIT, mode: 'hybrid' })
					.catch(() => emptyResults),
			])
		: [emptyResults, emptyResults, emptyResults];

	// 컨텍스트 생성 및 동적 프롬프트
	const labels = CONTEXT_LABELS[locale];
	const context = buildContext(blogResults, placeResults, photoResults, locale);
	const dynamicPrompt = `${getSystemPrompt(locale)}\n\n${labels.header}\n${context}`;

	const result = streamText({
		model: google('gemini-2.5-flash'),
		system: dynamicPrompt,
		messages: await convertToModelMessages(messages),
		stopWhen: stepCountIs(3),
		tools: {
			searchBlog: tool({
				description:
					'Search blog posts that Jung wrote. Use this when asked about blog posts, articles, or writings.',
				inputSchema: z.object({
					query: z.string().describe('Search query for blog posts'),
				}),
				execute: async ({ query }) => {
					const result = await blogService.semanticSearch({
						query,
						limit: TOOL_SEARCH_LIMIT,
						mode: 'hybrid',
						locale,
					});
					return result.items.map((item) => ({
						id: item.id,
						title: item.title,
						description: item.description,
						url: `/blog/${item.id}`,
					}));
				},
			}),
			searchPlaces: tool({
				description:
					'Search places that Jung loves or has visited. Use this when asked about favorite places, travel spots, or locations.',
				inputSchema: z.object({
					query: z.string().describe('Search query for places'),
				}),
				execute: async ({ query }) => {
					const result = await placesService.semanticSearch({
						query,
						limit: TOOL_SEARCH_LIMIT,
						mode: 'hybrid',
					});
					return result.items.map((item) => ({
						id: item.id,
						title: item.title,
						description: item.description,
						address: item.address,
						url: `/places/${item.id}`,
					}));
				},
			}),
			searchPhotos: tool({
				description:
					'Search photos in the gallery. Use this when asked about photos, images, or gallery.',
				inputSchema: z.object({
					query: z.string().describe('Search query for photos'),
				}),
				execute: async ({ query }) => {
					const result = await galleryService.semanticSearch({
						query,
						limit: TOOL_SEARCH_LIMIT,
						mode: 'hybrid',
					});
					return result.items.map((item) => ({
						id: item.id,
						description: item.description,
						tags: item.tags,
						url: `/gallery/photo/${item.id}`,
					}));
				},
			}),
			getProfile: tool({
				description:
					'Get public information about Jung. Use this when asked about who Jung is, skills, experience, or interests.',
				inputSchema: z.object({}),
				execute: async () => {
					const localized = getLocalizedProfile(locale);
					// Return only public-safe fields, excluding PII like email/linkedin
					return {
						personal: {
							name: localized.personal.name,
							title: localized.personal.title,
							location: localized.personal.location,
							github: localized.personal.github,
						},
						summary: localized.summary,
						skills: localized.skills,
						interests: localized.interests,
					};
				},
			}),
			searchAll: tool({
				description:
					'Search across all content (blog, places, photos) at once. Use when the question spans multiple domains or asks about overall content.',
				inputSchema: z.object({
					query: z.string().describe('Search query across all content'),
				}),
				execute: async ({ query }) => {
					const [blogs, places, photos] = await Promise.all([
						blogService
							.semanticSearch({
								query,
								limit: RAG_SEARCH_LIMIT,
								mode: 'hybrid',
								locale,
							})
							.catch(() => emptyResults),
						placesService
							.semanticSearch({
								query,
								limit: RAG_SEARCH_LIMIT,
								mode: 'hybrid',
							})
							.catch(() => emptyResults),
						galleryService
							.semanticSearch({
								query,
								limit: RAG_SEARCH_LIMIT,
								mode: 'hybrid',
							})
							.catch(() => emptyResults),
					]);
					return {
						blogs: blogs.items.map((b) => ({
							id: b.id,
							title: b.title,
							url: `/blog/${b.id}`,
						})),
						places: places.items.map((p) => ({
							id: p.id,
							title: p.title,
							url: `/places/${p.id}`,
						})),
						photos: photos.items.map((p) => ({
							id: p.id,
							description: p.description,
							url: `/gallery/photo/${p.id}`,
						})),
					};
				},
			}),
			getPlacesByLocation: tool({
				description:
					'Get places and related photos in a specific city or area. Use when asked about locations like "London", "Seoul", "Jeju".',
				inputSchema: z.object({
					location: z.string().describe('City or area name to search'),
				}),
				execute: async ({ location }) => {
					try {
						const escaped = escapePostgrestPattern(location);
						const { data: places } = await supabase
							.from('places')
							.select('id, title, description, address, tags')
							.or(`address.ilike.%${escaped}%,title.ilike.%${escaped}%`)
							.limit(TOOL_SEARCH_LIMIT);

						const allTags = [
							...new Set((places || []).flatMap((p) => p.tags || [])),
						];
						let photos: {
							id: string;
							description: string;
							tags: string[];
						}[] = [];
						if (allTags.length > 0) {
							const { data } = await supabase
								.from('photos')
								.select('id, description, tags')
								.overlaps('tags', allTags)
								.limit(TOOL_SEARCH_LIMIT);
							photos = (data as typeof photos) || [];
						}

						return {
							places: (places || []).map((p) => ({
								...p,
								url: `/places/${p.id}`,
							})),
							photos: photos.map((p) => ({
								...p,
								url: `/gallery/photo/${p.id}`,
							})),
						};
					} catch (error) {
						console.error('getPlacesByLocation error:', error);
						return { places: [], photos: [] };
					}
				},
			}),
			getContentStats: tool({
				description:
					'Get overall content statistics. Use when asked about how much content exists on the site.',
				inputSchema: z.object({}),
				execute: async () => {
					try {
						const [posts, photos, places] = await Promise.all([
							supabase
								.from('posts')
								.select('id', { count: 'exact', head: true }),
							supabase
								.from('photos')
								.select('id', { count: 'exact', head: true }),
							supabase
								.from('places')
								.select('id', { count: 'exact', head: true }),
						]);
						return {
							blogPosts: posts.count ?? 0,
							photos: photos.count ?? 0,
							places: places.count ?? 0,
						};
					} catch (error) {
						console.error('getContentStats error:', error);
						return { blogPosts: 0, photos: 0, places: 0 };
					}
				},
			}),
		},
	});

	return result.toUIMessageStreamResponse();
}
