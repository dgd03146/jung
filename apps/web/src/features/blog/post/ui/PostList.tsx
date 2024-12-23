'use client';

import { useGetPosts } from '@/fsd/features/blog/post';
import { SearchBar } from '@/fsd/features/spots/ui/SearchBar';
import {
	BlurImage,
	LoadingSpinner,
	capitalizeFirstLetter,
	formatDate,
} from '@/fsd/shared';
import { Container, Flex } from '@jung/design-system';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsFillPlayFill, BsGrid3X3Gap } from 'react-icons/bs';
import { CiViewList } from 'react-icons/ci';
import { useInView } from 'react-intersection-observer';
import { CategorySection } from './CategorySection';
import * as styles from './PostList.css';

type ViewMode = 'list' | 'grid' | 'table';
type Sort = 'latest' | 'oldest' | 'popular';

const PostList = () => {
	const [viewMode, setViewMode] = useState<ViewMode>('list');
	const searchParams = useSearchParams();
	const cat = searchParams.get('cat') || 'all';
	const sort = (searchParams.get('sort') as Sort) || 'latest';
	const q = searchParams.get('q') || '';

	const [data, query] = useGetPosts({ cat, sort, q });
	const { fetchNextPage, hasNextPage, isFetchingNextPage } = query;
	const { ref, inView } = useInView();

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, fetchNextPage, hasNextPage]);

	const allPosts = data?.pages.flatMap((page) => page.items) || [];

	// TODO: SUSPENSE 적용하기

	return (
		<div>
			<div className={styles.content}>
				<aside className={styles.sidebar}>
					<CategorySection title='All' />
					<CategorySection
						title='Dev'
						items={[
							{ name: 'React', count: 23, slug: 'React' },
							{ name: 'Nextjs', count: 12, slug: 'Nextjs' },
							{ name: 'Typescript', count: 8, slug: 'Typescript' },
							{ name: 'Architecture', count: 15, slug: 'Architecture' },
						]}
					/>
					<CategorySection
						title='Life'
						items={[
							{ name: 'UK', count: 45, slug: 'UK' },
							{ name: 'KOR', count: 18, slug: 'KOR' },
						]}
					/>
					<CategorySection
						title='Travel'
						items={[
							{ name: 'Portugal', count: 45, slug: 'Portugal' },
							{ name: 'Spain', count: 18, slug: 'Spain' },
						]}
					/>
				</aside>

				<main className={styles.mainContent}>
					<Container>
						<div className={styles.searchArea}>
							<SearchBar />
							<div className={styles.viewToggleGroup}>
								<button
									className={styles.viewToggle({ active: viewMode === 'list' })}
									onClick={() => setViewMode('list')}
									title='List view'
								>
									<CiViewList size={28} />
								</button>
								<button
									className={styles.viewToggle({ active: viewMode === 'grid' })}
									onClick={() => setViewMode('grid')}
									title='Grid view'
								>
									<BsGrid3X3Gap size={28} />
								</button>
								<button
									className={styles.viewToggle({
										active: viewMode === 'table',
									})}
									onClick={() => setViewMode('table')}
									title='Table view'
								>
									<BsFillPlayFill size={28} />
								</button>
							</div>
						</div>

						<div className={styles.postList({ viewMode })}>
							{allPosts.map((post, index) => (
								<article
									key={post.id}
									className={styles.postCard({ viewMode })}
								>
									<Link href={`/blog/${post.id}`} className={styles.postLink}>
										{viewMode === 'table' ? (
											<>
												<Flex align='center' gap='4'>
													<div className={styles.tableNumberWrapper}>
														<span className={styles.tableNumber}>
															{index + 1}
														</span>
														<span className={styles.playButton}>
															<BsFillPlayFill size={20} />
														</span>
													</div>
													<BlurImage
														src={post.imagesrc}
														alt={post.title}
														width={40}
														height={40}
													/>
												</Flex>
												<Flex direction='column' gap='1' flex='1'>
													<p className={styles.tableTitle}>{post.title}</p>
													<p className={styles.tableDescription}>
														{post.description}
													</p>
												</Flex>
												<Flex
													align='center'
													gap='2'
													justify='flex-end'
													flex='1'
													display={{ mobile: 'none', tablet: 'flex' }}
												>
													<span className={styles.category}>
														{capitalizeFirstLetter(post.category)}
													</span>

													<time
														className={styles.tableDate}
														dateTime={post.date}
													>
														{formatDate(post.date)}
													</time>
												</Flex>
											</>
										) : (
											<>
												<div className={styles.imageArea({ viewMode })}>
													<BlurImage
														src={post.imagesrc}
														alt={post.title}
														fill
														sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
													/>
												</div>

												<div className={styles.contentArea({ viewMode })}>
													<div className={styles.meta}>
														<span className={styles.category}>
															{capitalizeFirstLetter(post.category)}
														</span>

														<span className={styles.date}>
															{formatDate(post.date)}
														</span>
													</div>

													<h2 className={styles.title({ viewMode })}>
														{post.title}
													</h2>
													<p className={styles.description({ viewMode })}>
														{post.description}
													</p>
													<div className={styles.bottomArea}>
														{/* 태그 영역 */}
														{post.tags && post.tags.length > 0 && (
															<div className={styles.tagList}>
																{post.tags.map((tag) => (
																	<div key={tag} className={styles.tag}>
																		{tag}
																	</div>
																))}
															</div>
														)}
													</div>
												</div>
											</>
										)}
									</Link>
								</article>
							))}
						</div>

						<div ref={ref} className={styles.loadingArea}>
							{isFetchingNextPage && <LoadingSpinner size='small' />}
						</div>
					</Container>
				</main>
			</div>
		</div>
	);
};

export default PostList;
