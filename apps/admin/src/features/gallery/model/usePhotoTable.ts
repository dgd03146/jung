import type { Photo } from '@jung/shared/types';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {
	type ColumnDef,
	type PaginationState,
	type SortingState,
	type Updater,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
// import { fetchPhotos, usePhotos } from '@/fsd/features/gallery/api';

export interface PhotoFilters {
	page: number;
	pageSize: number;
	sortField?: string;
	sortOrder?: 'asc' | 'desc';
	filter?: string;
}

export const photoColumns: ColumnDef<Photo>[] = [
	{ header: 'Id', accessorKey: 'id' },
	{ header: '이미지', accessorKey: 'image_url' },
	{ header: '제목', accessorKey: 'title' },
	{ header: '설명', accessorKey: 'description' },
	{ header: '태그', accessorKey: 'tags' },
	{ header: '조회수', accessorKey: 'views' },
	{ header: '좋아요', accessorKey: 'likes' },
	{ header: '생성일', accessorKey: 'created_at' },
];

const PAGE_SIZE = 10;

const MOCK_PHOTOS: Photo[] = [
	{
		id: '1',
		title: '아름다운 풍경',
		description: '산과 호수가 어우러진 풍경 사진',
		image_url: 'https://picsum.photos/800/600?random=1',
		width: 800,
		height: 600,
		alt: '산과 호수 풍경',
		tags: ['자연', '풍경', '산', '호수'],
		views: 1200,
		likes: 340,
		created_at: '2024-01-15T09:00:00Z',
		liked_by: ['user1', 'user2', 'user3'],
	},
	{
		id: '2',
		title: '도시의 밤',
		description: '야경이 아름다운 도시 전경',
		image_url: 'https://picsum.photos/800/600?random=2',
		width: 800,
		height: 600,
		alt: '도시 야경',
		tags: ['도시', '야경', '건축'],
		views: 850,
		likes: 220,
		created_at: '2024-01-14T15:30:00Z',
		liked_by: ['user4', 'user5'],
	},
	{
		id: '3',
		title: '해변의 일몰',
		description: '황홀한 노을이 지는 해변가',
		image_url: 'https://picsum.photos/800/600?random=3',
		width: 800,
		height: 600,
		alt: '해변 일몰',
		tags: ['해변', '일몰', '바다'],
		views: 1500,
		likes: 450,
		created_at: '2024-01-13T18:20:00Z',
		liked_by: ['user1', 'user3'],
	},
	{
		id: '4',
		title: '봄의 벚꽃',
		description: '만개한 벚꽃 아래의 산책로',
		image_url: 'https://picsum.photos/800/600?random=4',
		width: 800,
		height: 600,
		alt: '벚꽃 산책로',
		tags: ['봄', '벚꽃', '자연'],
		views: 2000,
		likes: 680,
		created_at: '2024-01-12T11:40:00Z',
		liked_by: ['user2', 'user4'],
	},
	{
		id: '5',
		title: '카페 인테리어',
		description: '아늑한 분위기의 카페 내부',
		image_url: 'https://picsum.photos/800/600?random=5',
		width: 800,
		height: 600,
		alt: '카페 내부',
		tags: ['카페', '인테리어', '디자인'],
		views: 750,
		likes: 180,
		created_at: '2024-01-11T14:15:00Z',
		liked_by: ['user1'],
	},
];

export const usePhotoTable = () => {
	const navigate = useNavigate();
	const searchParams = useSearch({ from: '/gallery/photos/' }) as PhotoFilters;
	// const queryClient = useQueryClient();

	const filters: PhotoFilters = useMemo(
		() => ({
			page: Number(searchParams.page) || 0,
			pageSize: Number(searchParams.pageSize) || PAGE_SIZE,
			sortField: searchParams.sortField || 'created_at',
			sortOrder: searchParams.sortOrder || 'desc',
			filter: searchParams.filter,
		}),
		[searchParams],
	);

	// const { data, isLoading, error, refetch } = usePhotos(filters);
	const columns = useMemo(() => photoColumns, []);

	/* useEffect(() => {
		if (data?.nextCursor) {
			const nextPage = filters.page + 1;
			queryClient.prefetchQuery({
				queryKey: photoKeys.list({ ...filters, page: nextPage }),
				queryFn: () => fetchPhotos({ ...filters, page: nextPage }),
			});
		}
	}, [data?.nextCursor, filters, queryClient]); */

	const updateSearchParams = useCallback(
		(newParams: Partial<PhotoFilters>) => {
			navigate({ search: (prev) => ({ ...prev, ...newParams }) });
		},
		[navigate],
	);

	const table = useReactTable({
		columns,
		data: MOCK_PHOTOS,
		state: {
			sorting: filters.sortField
				? [{ id: filters.sortField, desc: filters.sortOrder === 'desc' }]
				: [],
			globalFilter: filters.filter,
			pagination: { pageIndex: filters.page, pageSize: filters.pageSize },
		},
		onPaginationChange: (updater: Updater<PaginationState>) => {
			const newPagination =
				typeof updater === 'function'
					? updater({ pageIndex: filters.page, pageSize: filters.pageSize })
					: updater;
			updateSearchParams({
				page: newPagination.pageIndex,
				pageSize: newPagination.pageSize,
			});
		},
		onSortingChange: (updater: Updater<SortingState>) => {
			const newSorting =
				typeof updater === 'function'
					? updater(
							filters.sortField
								? [
										{
											id: filters.sortField,
											desc: filters.sortOrder === 'desc',
										},
								  ]
								: [],
					  )
					: updater;
			const sort = newSorting[0];
			updateSearchParams({
				sortField: sort?.id,
				sortOrder: sort?.desc ? 'desc' : 'asc',
			});
		},
		onGlobalFilterChange: (filter: string) => {
			updateSearchParams({ filter });
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		manualPagination: true,
		manualSorting: true,
		manualFiltering: true,
		pageCount: Math.ceil(MOCK_PHOTOS.length / PAGE_SIZE),
	});

	return {
		table,
		isLoading: false,
		error: null,
		refetch: () => {},
	};
};
