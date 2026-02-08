import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { blogService } from '@jung/api/services/blog';
import { galleryService } from '@jung/api/services/gallery';
import { placesService } from '@jung/api/services/place';
import { convertToModelMessages, streamText, tool, type UIMessage } from 'ai';
import { z } from 'zod';
import { profileData } from '@/fsd/features/chatbot/config/profileData';
import { SYSTEM_PROMPT } from '@/fsd/features/chatbot/config/systemPrompt';

export const maxDuration = 30;

const google = createGoogleGenerativeAI({
	apiKey: process.env.GEMINI_API_KEY,
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
	const { messages }: { messages: UIMessage[] } = await req.json();

	// Extract last user message for RAG search
	const lastUserMessage = messages.filter((m) => m.role === 'user').pop();
	const query =
		lastUserMessage?.parts
			?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
			.map((p) => p.text)
			.join(' ') || '';

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
		model: google('gemini-2.5-flash'),
		system: dynamicPrompt,
		messages: await convertToModelMessages(messages),
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
					'Get public information about Jung. Use this when asked about who Jung is, skills, experience, or interests.',
				inputSchema: z.object({}),
				execute: async () => {
					// Return only public-safe fields, excluding PII like email/linkedin
					return {
						personal: {
							name: profileData.personal.name,
							title: profileData.personal.title,
							location: profileData.personal.location,
							github: profileData.personal.github,
						},
						summary: profileData.summary,
						skills: profileData.skills,
						interests: profileData.interests,
					};
				},
			}),
		},
	});

	return result.toUIMessageStreamResponse();
}
