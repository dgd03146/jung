import type { AdjacentPosts, Post, PostPreview } from '@jung/shared/types';
import { TRPCError } from '@trpc/server';
import {
	generateEmbedding,
	preparePostTextForEmbedding,
} from '../lib/embedding';
import { supabase } from '../lib/supabase';

type QueryParams = {
	limit: number;
	cursor?: number;
	cat?: string;
	sort: 'latest' | 'oldest' | 'popular';
	q?: string;
	locale?: 'ko' | 'en';
};

type PostWithCategory = Post & {
	categories: {
		name: string;
	};
	category_id: string;
	title_ko?: string;
	title_en?: string;
	description_ko?: string;
	description_en?: string;
	content_ko?: unknown;
	content_en?: unknown;
	tags_en?: string[];
};

type QueryResult = {
	items: Post[];
	nextCursor: number | null;
	// total?: number;	`
};

export const blogService = {
	async findMany({
		limit,
		cursor,
		cat,
		sort,
		q,
		locale = 'ko',
	}: QueryParams): Promise<QueryResult> {
		try {
			// Select locale-specific columns with fallback to Korean
			const titleCol = locale === 'en' ? 'title_en' : 'title_ko';
			const descCol = locale === 'en' ? 'description_en' : 'description_ko';
			const contentCol = locale === 'en' ? 'content_en' : 'content_ko';

			let query = supabase
				.from('posts')
				.select(`
					id,
					${titleCol},
					${descCol},
					${contentCol},
					date,
					views,
					likes,
					liked_by,
					category_id,
					tags,
					tags_en,
					imagesrc,
					categories!inner(name).name as category
				`)
				.eq('categories.type', 'blog');

			if (cat && cat !== 'all') {
				const { data: selectedCategory, error: categoryError } = await supabase
					.from('categories')
					.select('id')
					.ilike('name', cat)
					.eq('type', 'blog')
					.single();

				if (categoryError) {
					throw new TRPCError({
						code: 'INTERNAL_SERVER_ERROR',
						message: 'Failed to fetch categories. Please try again later.',
						cause: categoryError,
					});
				}

				if (selectedCategory) {
					const { data: childCategories, error: childError } = await supabase
						.from('categories')
						.select('id')
						.eq('type', 'blog')
						.eq('parent_id', selectedCategory.id);

					if (childError) {
						throw new TRPCError({
							code: 'INTERNAL_SERVER_ERROR',
							message:
								'Failed to fetch child categories. Please try again later.',
							cause: childError,
						});
					}

					const allCategoryIds = [
						selectedCategory.id,
						...(childCategories?.map((category) => category.id) || []),
					];

					query = query.in('category_id', allCategoryIds);
				} else {
					return {
						items: [],
						nextCursor: null,
					};
				}
			}

			if (q) {
				const searchTerm = `%${q}%`;

				query = query.or(
					`title.ilike.${searchTerm},` +
						`description.ilike.${searchTerm},` +
						`tags.cs.{${q}}`,
				);
			}

			if (cursor) {
				const { data: cursorPost } = await supabase
					.from('posts')
					.select('date')
					.eq('id', cursor)
					.single();

				if (cursorPost) {
					const operator = sort === 'oldest' ? 'gt' : 'lt';
					query = query[operator]('date', cursorPost.date);
				}
			}

			if (sort === 'popular') {
				query = query.order('views', { ascending: false });
			} else {
				const isAscending = sort === 'oldest';
				query = query.order('date', { ascending: isAscending });
			}

			query = query.limit(limit);

			const { data, error } = await query.returns<PostWithCategory[]>();

			if (error) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to fetch posts. Please try again later.',
					cause: error,
				});
			}

			if (!data || data.length === 0) {
				return {
					items: [],
					nextCursor: null,
				};
			}

			const lastItem = data[data.length - 1];
			const nextCursor = data.length === limit ? Number(lastItem?.id) : null;

			return {
				items: data.map((post) => {
					const {
						categories,
						category_id,
						title_ko,
						title_en,
						description_ko,
						description_en,
						content_ko,
						content_en,
						tags,
						tags_en,
						...rest
					} = post;

					// Map locale-specific fields to standard field names with fallback
					const title =
						(locale === 'en' ? title_en : title_ko) || title_ko || '';
					const description =
						(locale === 'en' ? description_en : description_ko) ||
						description_ko ||
						'';
					const content =
						(locale === 'en' ? content_en : content_ko) || content_ko;
					const localizedTags =
						(locale === 'en' ? tags_en : tags) || tags || [];

					return {
						...rest,
						title,
						description,
						content,
						tags: localizedTags,
						category: categories.name,
					};
				}),
				nextCursor,
			};
		} catch (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to create post. Please try again later.',
				cause: error,
			});
		}
	},

	async findById({
		postId,
		locale = 'ko',
	}: {
		postId: string;
		locale?: 'ko' | 'en';
	}): Promise<Post | null> {
		const { data, error } = await supabase
			.from('posts')
			.select(`
				*,
				categories!inner(name)->name as category
			`)
			.eq('id', postId)
			.single<PostWithCategory>();

		if (error) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Post not found. Please try searching again.',
				cause: error,
			});
		}
		if (!data) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Post not found. Please try searching again.',
			});
		}

		try {
			const {
				categories,
				category_id,
				title_ko,
				title_en,
				description_ko,
				description_en,
				content_ko,
				content_en,
				tags,
				tags_en,
				...rest
			} = data;

			// Select locale-specific fields with fallback to Korean
			const title = (locale === 'en' ? title_en : title_ko) || title_ko || '';
			const description =
				(locale === 'en' ? description_en : description_ko) ||
				description_ko ||
				'';
			const content = (locale === 'en' ? content_en : content_ko) || content_ko;
			const localizedTags = (locale === 'en' ? tags_en : tags) || tags || [];

			return {
				...rest,
				title,
				description,
				tags: localizedTags,
				category: categories.name,
				content: typeof content === 'string' ? JSON.parse(content) : content,
			};
		} catch (e) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Invalid post content format',
				cause: e,
			});
		}
	},

	async create(post: Omit<Post, 'id'>): Promise<Post> {
		const { data, error } = await supabase
			.from('posts')
			.insert(post)
			.select()
			.single();

		if (error) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Failed to create post. Please try again later.',
				cause: error,
			});
		}
		if (!data) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to create post. Please try again later.',
			});
		}
		return data as Post;
	},

	// 좋아요 (로그인 사용자 또는 익명 사용자)

	async toggleLike({
		postId,
		identifier,
	}: {
		postId: string;
		identifier: string; // userId 또는 anonymousId (anon_xxx)
	}): Promise<Post> {
		const { data: post, error: selectError } = await supabase
			.from('posts')
			.select('*')
			.eq('id', postId)
			.single<Post>();

		if (selectError) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: `Failed to fetch post: ${selectError.message}`,
				cause: selectError,
			});
		}

		if (!post) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Post not found',
			});
		}

		const hasLiked = post.liked_by.includes(identifier);
		const newLikes = hasLiked ? post.likes - 1 : post.likes + 1;
		const newLikedBy = hasLiked
			? post.liked_by.filter((id) => id !== identifier)
			: [...post.liked_by, identifier];

		const { data, error } = await supabase
			.from('posts')
			.update({
				likes: newLikes,
				liked_by: newLikedBy,
			})
			.eq('id', postId)
			.select()
			.single<Post>();

		if (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: `Failed to toggle like: ${error.message}`,
				cause: error,
			});
		}

		if (!data) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Post not found or like could not be toggled',
			});
		}

		return data;
	},

	// 이전, 이후 포스트 가져오기
	async getAdjacentPosts({
		postId,
	}: {
		postId: string;
	}): Promise<AdjacentPosts> {
		const currentPost = await this.findById({ postId });

		if (!currentPost) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Current post not found',
			});
		}

		// 현재 포스트의 date를 기준으로 이전/이후 포스트를 각각 하나씩 가져옴
		const [{ data: previousPost }, { data: nextPost }] = await Promise.all([
			supabase
				.from('posts')
				.select('id, title')
				.lt('date', currentPost.date)
				.order('date', { ascending: false })
				.limit(1)
				.single<PostPreview>(),
			supabase
				.from('posts')
				.select('id, title')
				.gt('date', currentPost.date)
				.order('date', { ascending: true })
				.limit(1)
				.single<PostPreview>(),
		]);

		return {
			previous: previousPost || null,
			next: nextPost || null,
		};
	},

	// 좋아요 정보만 가져오기
	async getLikeInfo(
		postId: string,
	): Promise<{ likes: number; liked_by: string[] }> {
		try {
			const { data, error } = await supabase
				.from('posts')
				.select('likes, liked_by')
				.eq('id', postId)
				.single<{ likes: number; liked_by: string[] }>();

			if (error) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Failed to fetch like info: ${error.message}`,
					cause: error,
				});
			}

			if (!data) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Post not found',
				});
			}

			return {
				likes: data.likes,
				liked_by: data.liked_by || [],
			};
		} catch (error) {
			if (error instanceof TRPCError) {
				throw error;
			}

			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'An unexpected error occurred while fetching like info',
				cause: error,
			});
		}
	},

	// ===== 시맨틱 검색 (Agentic RAG) =====

	/**
	 * 시맨틱 검색 - Vector + Keyword 하이브리드
	 *
	 * 1. 쿼리 임베딩 생성 (Gemini)
	 * 2. pgvector 유사도 검색
	 * 3. 기존 ilike 키워드 검색
	 * 4. Reciprocal Rank Fusion (RRF)으로 병합
	 */
	async semanticSearch({
		query,
		limit = 5,
		mode = 'hybrid',
		locale = 'ko',
	}: {
		query: string;
		limit?: number;
		mode?: 'vector' | 'keyword' | 'hybrid';
		locale?: 'ko' | 'en';
	}): Promise<{
		items: Array<{
			id: string;
			title: string;
			description: string;
			date?: string;
			views?: number;
			likes?: number;
			tags?: string[];
			imagesrc?: string[];
			category?: string;
			similarity?: number;
			source: 'vector' | 'keyword' | 'both';
		}>;
		meta: {
			mode: string;
			vectorCount: number;
			keywordCount: number;
			fusedCount: number;
		};
	}> {
		// 결과 저장
		let vectorResults: Array<{
			id: number;
			title_ko: string;
			title_en: string;
			description_ko: string;
			similarity: number;
		}> = [];
		let keywordResults: Array<{
			id: number;
			title_ko: string;
			title_en: string;
			description_ko: string;
			description_en: string;
		}> = [];

		// 1. Vector 검색 (mode가 vector 또는 hybrid일 때)
		if (mode === 'vector' || mode === 'hybrid') {
			try {
				const embedding = await generateEmbedding(query);

				const { data, error } = await supabase.rpc('match_posts', {
					query_embedding: embedding,
					match_threshold: 0.3, // 낮은 임계값으로 더 많은 결과
					match_count: limit * 2,
				});

				if (error) {
					console.error('Vector search error:', error);
				} else {
					vectorResults = data || [];
				}
			} catch (err) {
				console.error('Embedding generation error:', err);
			}
		}

		// 2. Keyword 검색 (mode가 keyword 또는 hybrid일 때)
		if (mode === 'keyword' || mode === 'hybrid') {
			const searchTerm = `%${query}%`;

			const { data, error } = await supabase
				.from('posts')
				.select('id, title_ko, title_en, description_ko, description_en')
				.or(
					`title_ko.ilike.${searchTerm},title_en.ilike.${searchTerm},description_ko.ilike.${searchTerm},description_en.ilike.${searchTerm}`,
				)
				.limit(limit * 2);

			if (error) {
				console.error('Keyword search error:', error);
			} else {
				keywordResults = data || [];
			}
		}

		// 3. Reciprocal Rank Fusion (RRF)
		const k = 60; // RRF 상수
		const scores = new Map<
			number,
			{
				score: number;
				source: 'vector' | 'keyword' | 'both';
				data: {
					title_ko?: string;
					title_en?: string;
					description_ko?: string;
					description_en?: string;
					similarity?: number;
				};
			}
		>();

		// Vector 결과에 점수 부여
		vectorResults.forEach((item, rank) => {
			const existing = scores.get(item.id);
			scores.set(item.id, {
				score: (existing?.score || 0) + 1 / (k + rank + 1),
				source: existing ? 'both' : 'vector',
				data: {
					...existing?.data,
					title_ko: item.title_ko,
					title_en: item.title_en,
					description_ko: item.description_ko,
					similarity: item.similarity,
				},
			});
		});

		// Keyword 결과에 점수 부여
		keywordResults.forEach((item, rank) => {
			const existing = scores.get(item.id);
			scores.set(item.id, {
				score: (existing?.score || 0) + 1 / (k + rank + 1),
				source: existing ? 'both' : 'keyword',
				data: {
					...existing?.data,
					title_ko: item.title_ko,
					title_en: item.title_en,
					description_ko: item.description_ko,
					description_en: item.description_en,
				},
			});
		});

		// 점수순 정렬 후 상위 N개 ID 추출
		const sortedResults = [...scores.entries()]
			.sort((a, b) => b[1].score - a[1].score)
			.slice(0, limit);

		const postIds = sortedResults.map(([id]) => id);

		// 전체 Post 정보 조회
		const titleCol = locale === 'en' ? 'title_en' : 'title_ko';
		const descCol = locale === 'en' ? 'description_en' : 'description_ko';

		const { data: fullPosts, error: postsError } = await supabase
			.from('posts')
			.select(
				`
				id,
				${titleCol},
				${descCol},
				date,
				views,
				likes,
				tags,
				tags_en,
				imagesrc,
				category_id,
				categories!inner(name)
			`,
			)
			.in('id', postIds);

		if (postsError) {
			console.error('Full posts fetch error:', postsError);
		}

		// 원래 순서 유지하며 매핑
		const postMap = new Map(
			(fullPosts || []).map((p) => [
				p.id,
				{
					id: String(p.id),
					title: (p as Record<string, unknown>)[titleCol] as string,
					description: (p as Record<string, unknown>)[descCol] as string,
					date: p.date,
					views: p.views,
					likes: p.likes,
					tags: locale === 'en' ? p.tags_en || p.tags : p.tags,
					imagesrc: p.imagesrc,
					category: (p.categories as unknown as { name: string })?.name || '',
				},
			]),
		);

		const fusedResults = sortedResults.map(([id, { source, data }]) => {
			const fullPost = postMap.get(id);
			return {
				id: String(id),
				title: fullPost?.title || data.title_ko || '',
				description: fullPost?.description || data.description_ko || '',
				date: fullPost?.date,
				views: fullPost?.views,
				likes: fullPost?.likes,
				tags: fullPost?.tags,
				imagesrc: fullPost?.imagesrc,
				category: fullPost?.category,
				similarity: data.similarity,
				source,
			};
		});

		return {
			items: fusedResults,
			meta: {
				mode,
				vectorCount: vectorResults.length,
				keywordCount: keywordResults.length,
				fusedCount: fusedResults.length,
			},
		};
	},

	/**
	 * 포스트 임베딩 생성 및 저장
	 * 포스트 생성/수정 시 호출
	 */
	async generateEmbeddingForPost(
		postId: string,
	): Promise<{ success: boolean }> {
		try {
			// 포스트 조회
			const { data: post, error: fetchError } = await supabase
				.from('posts')
				.select('title_ko, title_en, description_ko, description_en, tags')
				.eq('id', postId)
				.single();

			if (fetchError || !post) {
				console.error(`Post not found: ${postId}`);
				return { success: false };
			}

			// 임베딩용 텍스트 준비
			const text = preparePostTextForEmbedding({
				title_ko: post.title_ko,
				title_en: post.title_en,
				description_ko: post.description_ko,
				description_en: post.description_en,
				tags: post.tags,
			});

			if (!text.trim()) {
				console.warn(`No text to embed for post ${postId}`);
				return { success: false };
			}

			// 임베딩 생성
			const embedding = await generateEmbedding(text);

			// DB에 저장
			const { error: updateError } = await supabase
				.from('posts')
				.update({ embedding })
				.eq('id', postId);

			if (updateError) {
				console.error(
					`Failed to save embedding for post ${postId}:`,
					updateError,
				);
				return { success: false };
			}

			return { success: true };
		} catch (err) {
			console.error(`Embedding generation failed for post ${postId}:`, err);
			return { success: false };
		}
	},
};
