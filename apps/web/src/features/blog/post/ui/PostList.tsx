'use client';

import { useGetPosts } from '@/fsd/features/blog/post';
import {
	BlurImage,
	LoadingSpinner,
	capitalizeFirstLetter,
	formatDate,
} from '@/fsd/shared';
import { EmptyState } from '@/fsd/shared/ui';
import { SearchBar } from '@/fsd/shared/ui/SearchBar';
import { Box, Button, Flex, Tag, Typography } from '@jung/design-system';
import type { GetCategoryItem } from '@jung/shared/types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsFillPlayFill, BsGrid3X3Gap } from 'react-icons/bs';
import { CiViewList } from 'react-icons/ci';
import { useInView } from 'react-intersection-observer';
import { CategoryNav } from './CategoryNav';
import * as styles from './PostList.css';

type ViewMode = 'list' | 'grid' | 'table';
type Sort = 'latest' | 'oldest' | 'popular';

const PostList = ({ categories }: { categories: GetCategoryItem[] }) => {
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

	const allPosts = data.pages.flatMap((page) => page.items) || [];

	if (allPosts.length === 0) {
		return <EmptyState />;
	}

	return (
		<Flex gap={{ mobile: '0', tablet: '10' }}>
			<CategoryNav categories={categories} />

			<Box as='main' minWidth='0' flex='1'>
				<Flex
					align='center'
					justify='space-between'
					gap='2.5'
					paddingBottom='2'
				>
					<SearchBar />
					<Flex gap='1'>
						<Button
							variant='outline'
							selected={viewMode === 'list'}
							borderRadius='md'
							onClick={() => setViewMode('list')}
							title='List view'
						>
							<CiViewList size={28} />
						</Button>
						<Button
							variant='outline'
							selected={viewMode === 'grid'}
							borderRadius='md'
							onClick={() => setViewMode('grid')}
							title='Grid view'
						>
							<BsGrid3X3Gap size={28} />
						</Button>
						<Button
							variant='outline'
							selected={viewMode === 'table'}
							borderRadius='md'
							onClick={() => setViewMode('table')}
							title='Table view'
						>
							<BsFillPlayFill size={28} />
						</Button>
					</Flex>
				</Flex>

				<Box className={styles.postList({ viewMode })}>
					{allPosts.map((post, index) => (
						<Box
							as='article'
							key={post.id}
							className={styles.postCard({ viewMode })}
						>
							<Link href={`/blog/${post.id}`} className={styles.postLink}>
								{viewMode === 'table' ? (
									<>
										<Flex align='center' gap='4'>
											<Flex
												position='relative'
												width='6'
												height='6'
												justify='center'
												align='center'
											>
												<Typography.Text
													level={4}
													color='primary'
													fontWeight='medium'
													position='absolute'
													transition='fast'
													className={styles.tableNumber}
												>
													{index + 1}
												</Typography.Text>
												<Flex
													align='center'
													justify='center'
													color='primary'
													position='absolute'
													opacity={0}
													transition='fast'
													className={styles.playButton}
												>
													<BsFillPlayFill size={20} />
												</Flex>
											</Flex>
											<BlurImage
												src={post.imagesrc}
												alt={post.title}
												width={40}
												height={40}
											/>
										</Flex>
										<Flex direction='column' gap='1' flex='1'>
											<Typography.Text
												truncate='single'
												fontWeight='medium'
												color={{ hover: 'primary' }}
											>
												{post.title}
											</Typography.Text>
											<Typography.SubText level={3} truncate='single'>
												{post.description}
											</Typography.SubText>
										</Flex>
										<Flex
											align='center'
											gap='2'
											justify='flex-end'
											flex='1'
											color='primary'
											display={{ mobile: 'none', tablet: 'flex' }}
										>
											<Typography.Text
												className={styles.category}
												background='primary50'
												color='primary'
											>
												{capitalizeFirstLetter(post.category)}
											</Typography.Text>

											<Typography.SubText level={3}>
												{formatDate(post.date)}
											</Typography.SubText>
										</Flex>
									</>
								) : (
									<>
										<Box className={styles.imageArea({ viewMode })}>
											<BlurImage
												src={post.imagesrc}
												alt={post.title}
												fill
												sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
												priority={index <= 6}
											/>
										</Box>

										<Flex
											flexDirection='column'
											flex='1'
											gap='3'
											className={styles.contentArea({ viewMode })}
										>
											<Flex
												gap='3'
												align='center'
												marginTop='1'
												color='primary'
											>
												<Typography.Text
													className={styles.category}
													background='primary50'
												>
													{capitalizeFirstLetter(post.category)}
												</Typography.Text>

												<Typography.SubText level={3}>
													{formatDate(post.date)}
												</Typography.SubText>
											</Flex>

											<Typography.Heading level={4}>
												{post.title}
											</Typography.Heading>
											<Typography.Text
												level={3}
												color='primary400'
												marginBottom='4'
												truncate='two'
											>
												{post.description}
											</Typography.Text>
											<Box marginTop='auto'>
												{post.tags && post.tags.length > 0 && (
													<Flex gap='2' wrap='wrap' flex='1' minWidth='0'>
														{post.tags.map((tag) => (
															<Tag key={tag} variant='secondary'>
																<Typography.FootNote level={1}>
																	# {tag}
																</Typography.FootNote>
															</Tag>
														))}
													</Flex>
												)}
											</Box>
										</Flex>
									</>
								)}
							</Link>
						</Box>
					))}
				</Box>

				<Box
					ref={ref}
					display='flex'
					justifyContent='center'
					paddingY='5'
					minHeight='10'
				>
					{isFetchingNextPage && <LoadingSpinner size='small' />}
				</Box>
			</Box>
		</Flex>
	);
};

export default PostList;
