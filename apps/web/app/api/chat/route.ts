import { google } from '@ai-sdk/google';
import { blogService } from '@jung/api/services/blog';
import { galleryService } from '@jung/api/services/gallery';
import { placesService } from '@jung/api/services/place';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { profileData } from '@/fsd/features/chatbot/config/profileData';
import { SYSTEM_PROMPT } from '@/fsd/features/chatbot/config/systemPrompt';

export const maxDuration = 30;

// Request validation schema
const chatMessageSchema = z.object({
	role: z.enum(['user', 'assistant', 'system']),
	content: z.string(),
});

const chatRequestSchema = z.object({
	messages: z.array(chatMessageSchema).min(1),
});

// RAG: 관련 컨텍스트 생성
function buildContext(
	blogs: { items: Array<{ title: string; description: string }> },
	places: { items: Array<{ title: string; description: string }> },
	photos: { items: Array<{ description: string; tags: string[] }> },
): string {
	const parts: string[] = [];

	if (blogs.items.length > 0) {
		parts.push('### 관련 블로그 글');
		parts.push(
			blogs.items.map((b) => `- ${b.title}: ${b.description}`).join('\n'),
		);
	}

	if (places.items.length > 0) {
		parts.push('### 관련 장소');
		parts.push(
			places.items.map((p) => `- ${p.title}: ${p.description}`).join('\n'),
		);
	}

	if (photos.items.length > 0) {
		parts.push('### 관련 사진');
		parts.push(
			photos.items
				.map((p) => `- ${p.description || p.tags?.join(', ')}`)
				.join('\n'),
		);
	}

	return parts.length > 0
		? parts.join('\n\n')
		: '관련 데이터를 찾지 못했습니다.';
}

export async function POST(req: Request) {
	// Validate request body
	let messages: z.infer<typeof chatRequestSchema>['messages'];
	try {
		const body = await req.json();
		const parsed = chatRequestSchema.parse(body);
		messages = parsed.messages;
	} catch {
		return new Response(
			'Invalid request: messages must be an array of {role, content}',
			{
				status: 400,
			},
		);
	}

	// 마지막 사용자 메시지 추출
	const lastUserMessage = messages.filter((m) => m.role === 'user').pop();
	const query = lastUserMessage?.content || '';

	// RAG: 관련 데이터 병렬 시맨틱 검색
	const [blogResults, placeResults, photoResults] = await Promise.all([
		blogService
			.semanticSearch({ query, limit: 3, mode: 'hybrid', locale: 'ko' })
			.catch(() => ({ items: [] })),
		placesService
			.semanticSearch({ query, limit: 3, mode: 'hybrid' })
			.catch(() => ({ items: [] })),
		galleryService
			.semanticSearch({ query, limit: 3, mode: 'hybrid' })
			.catch(() => ({ items: [] })),
	]);

	// 컨텍스트 생성 및 동적 프롬프트
	const context = buildContext(blogResults, placeResults, photoResults);
	const dynamicPrompt = `${SYSTEM_PROMPT}\n\n## 검색된 관련 정보\n${context}`;

	const result = streamText({
		model: google('gemini-1.5-pro'),
		system: dynamicPrompt,
		messages,
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
						limit: 5,
						mode: 'hybrid',
						locale: 'ko',
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
						limit: 5,
						mode: 'hybrid',
					});
					return result.items.map((item) => ({
						id: item.id,
						title: item.title,
						description: item.description,
						address: item.address,
						url: `/spots/${item.id}`,
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
						limit: 5,
						mode: 'hybrid',
					});
					return result.items.map((item) => ({
						id: item.id,
						description: item.description,
						tags: item.tags,
						url: `/gallery/${item.id}`,
					}));
				},
			}),
			getProfile: tool({
				description:
					'Get personal information about Jung. Use this when asked about who Jung is, skills, experience, or contact information.',
				inputSchema: z.object({}),
				execute: async () => {
					return profileData;
				},
			}),
		},
	});

	return result.toUIMessageStreamResponse();
}
