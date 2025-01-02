import type { Spot, SpotCategory } from '@jung/shared/types';
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

export interface SpotFilters {
	page: number;
	pageSize: number;
	sortField?: string;
	sortOrder?: 'asc' | 'desc';
	filter?: string;
}

export const CATEGORY_LABELS: Record<SpotCategory, string> = {
	nature: '자연/풍경',
	landmark: '랜드마크',
	historic: '역사/문화유산',
	culture: '문화시설',
	night: '야경 명소',
	street: '거리/골목',
	park: '공원',
	local: '로컬/전통',
};

const PAGE_SIZE = 10;

const MOCK_SPOTS: Spot[] = [
	{
		id: '123e4567-e89b-12d3-a456-426614174000',
		title: '남산서울타워',
		description:
			'서울의 상징적인 랜드마크이자 최고의 전망대. 아름다운 야경과 레스토랑, 각종 문화시설을 즐길 수 있는 복합문화공간',
		address: '서울특별시 용산구 남산공원길 105',
		photos: [
			{
				id: 'photo1',
				url: 'https://picsum.photos/800/600?random=1',
			},
			{
				id: 'photo2',
				url: 'https://picsum.photos/800/600?random=2',
			},
		],
		rating: 4.5,
		coordinates: {
			lat: 37.551168,
			lng: 126.988228,
		},
		category: 'landmark',
		created_at: '2024-03-20T09:00:00Z',
		updated_at: '2024-03-20T09:00:00Z',
		tags: ['전망대', '데이트', '야경', '서울'],
		tips: ['석양 무렵 방문 추천', '주말은 혼잡', '케이블카 이용시 줄 참고'],
		likes: 1234,
		liked_by: [],
	},
	{
		id: '223e4567-e89b-12d3-a456-426614174001',
		title: '경복궁',
		description:
			'조선왕조의 법궁으로, 조선시대 대표적인 건축물. 수려한 전통 건축미와 역사적 가치를 지닌 문화유산',
		address: '서울특별시 종로구 사직로 161',
		photos: [
			{
				id: 'photo3',
				url: 'https://picsum.photos/800/600?random=3',
			},
		],
		rating: 4.8,
		coordinates: {
			lat: 37.579617,
			lng: 126.977041,
		},
		category: 'historic',
		created_at: '2024-03-19T09:00:00Z',
		updated_at: '2024-03-19T09:00:00Z',
		tags: ['고궁', '한옥', '역사', '문화유산'],
		tips: ['아침 일찍 방문 추천', '한복 대여 가능', '야간개장 확인'],
		likes: 2345,
		liked_by: [],
	},
	{
		id: '323e4567-e89b-12d3-a456-426614174002',
		title: '한강공원',
		description:
			'도심 속 휴식처이자 레저 공간. 자전거 대여, 피크닉, 수상 스포츠 등 다양한 활동이 가능한 복합 공원',
		address: '서울특별시 영등포구 여의동로 330',
		photos: [
			{
				id: 'photo4',
				url: 'https://picsum.photos/800/600?random=4',
			},
		],
		rating: 4.3,
		coordinates: {
			lat: 37.526389,
			lng: 126.933611,
		},
		category: 'park',
		created_at: '2024-03-18T09:00:00Z',
		updated_at: '2024-03-18T09:00:00Z',
		tags: ['공원', '피크닉', '자전거', '한강'],
		tips: ['저녁에 치맥 추천', '돗자리 필수', '자전거 대여소 위치 확인'],
		likes: 1876,
		liked_by: [],
	},
	{
		id: '423e4567-e89b-12d3-a456-426614174003',
		title: '북촌한옥마을',
		description:
			'전통 한옥이 밀집된 서울의 대표적인 역사문화 마을. 전통 공방과 박물관, 카페 등이 어우러진 문화 공간',
		address: '서울특별시 종로구 계동길 37',
		photos: [
			{
				id: 'photo5',
				url: 'https://picsum.photos/800/600?random=5',
			},
		],
		rating: 4.6,
		coordinates: {
			lat: 37.582778,
			lng: 126.983889,
		},
		category: 'historic',
		created_at: '2024-03-17T09:00:00Z',
		updated_at: '2024-03-17T09:00:00Z',
		tags: ['한옥', '전통', '문화', '카페'],
		tips: ['평일 방문 추천', '한복 체험 가능', '골목길 지도 필수'],
		likes: 3421,
		liked_by: [],
	},
	{
		id: '523e4567-e89b-12d3-a456-426614174004',
		title: '동대문디자인플라자',
		description:
			'현대적 건축미가 돋보이는 복합 문화 공간. 전시, 쇼핑, 공연 등 다양한 문화 콘텐츠를 즐길 수 있는 랜드마크',
		address: '서울특별시 중구 을지로 281',
		photos: [
			{
				id: 'photo6',
				url: 'https://picsum.photos/800/600?random=6',
			},
		],
		rating: 4.4,
		coordinates: {
			lat: 37.566667,
			lng: 127.009722,
		},
		category: 'culture',
		created_at: '2024-03-16T09:00:00Z',
		updated_at: '2024-03-16T09:00:00Z',
		tags: ['디자인', '건축', '전시', '쇼핑'],
		tips: ['야간 촬영 추천', '주변 먹자골목 방문', '전시 일정 체크'],
		likes: 1543,
		liked_by: [],
	},
];

export const useSpotTable = () => {
	const navigate = useNavigate();
	const searchParams = useSearch({ from: '/spots/' }) as SpotFilters;

	const filters: SpotFilters = useMemo(
		() => ({
			page: Number(searchParams.page) || 0,
			pageSize: Number(searchParams.pageSize) || PAGE_SIZE,
			sortField: searchParams.sortField || 'created_at',
			sortOrder: searchParams.sortOrder || 'desc',
			filter: searchParams.filter,
		}),
		[searchParams],
	);

	const columns = useMemo<ColumnDef<Spot>[]>(
		() => [
			{
				header: '썸네일',
				accessorKey: 'photos',
				size: 100,
			},
			{
				header: '제목',
				accessorKey: 'title',
				size: 200,
			},
			{
				header: '카테고리',
				accessorKey: 'category',
				size: 150,
			},
			{
				header: '주소',
				accessorKey: 'address',
				size: 300,
			},
			{
				header: '위치',
				accessorKey: 'coordinates',
				size: 200,
			},
			{
				header: '평점',
				accessorKey: 'rating',
				size: 100,
			},
			{
				header: '좋아요',
				accessorKey: 'likes',
				size: 100,
			},
			{
				header: '팁',
				accessorKey: 'tips',
				size: 250,
			},
			{
				header: '생성일',
				accessorKey: 'created_at',
				size: 150,
			},
		],
		[],
	);

	const updateSearchParams = useCallback(
		(newParams: Partial<SpotFilters>) => {
			navigate({ search: (prev) => ({ ...prev, ...newParams }) });
		},
		[navigate],
	);

	const table = useReactTable({
		columns,
		data: MOCK_SPOTS,
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
		pageCount: Math.ceil(MOCK_SPOTS.length / PAGE_SIZE),
	});

	return {
		table,
		isLoading: false,
		error: null,
		refetch: () => {},
	};
};
