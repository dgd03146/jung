'use client';

import { Box, Container } from '@jung/design-system/components';
import { useState } from 'react';
import { IoGridOutline, IoMapOutline } from 'react-icons/io5';
import { CategoryFilter, type CategoryValue } from './CategoryFilter';
import { SearchBar } from './SearchBar';
import { SpotCard } from './SpotCard';
import * as styles from './SpotList.css';
import { SpotMap } from './SpotMap';

export type SpotCategory =
	| 'nature' // 자연/풍경 (산, 공원, 해변 등)
	| 'landmark' // 랜드마크/대표명소 (타워, 광장, 대표건물 등)
	| 'historic' // 역사/문화유산 (고궁, 사찰 등)
	| 'culture' // 문화시설 (박물관, 미술관, 공연장 등)
	| 'night' // 야경 명소
	| 'street' // 거리/골목 (핫플레이스, 특색있는 거리)
	| 'park' // 공원/광장 (도시공원, 테마파크 등)
	| 'local'; // 로컬/전통 (전통시장, 마을, 특색있는 동네 등)

export interface Spot {
	id: string;
	title: string;
	description: string;
	address: string;
	photos: {
		id: string;
		url: string;
	}[];
	rating: number;
	coordinates: {
		lat: number;
		lng: number;
	};
	category: SpotCategory;
	created_at?: string;
	updated_at?: string;
}

export const MOCK_SPOTS: Spot[] = [
	{
		id: '1',
		title: '남산 서울타워',
		description: '서울의 상징적인 랜드마크이자 최고의 야경 명소',
		address: '서울특별시 용산구 남산공원길 105',
		coordinates: {
			lat: 37.5511,
			lng: 126.9882,
		},
		photos: [
			{
				id: 'p1',
				url: 'https://images.unsplash.com/photo-1617541086271-4d43983704bd',
			},
			{
				id: 'p2',
				url: 'https://images.unsplash.com/photo-1578637387939-43c525550085',
			},
			{
				id: 'p3',
				url: 'https://images.unsplash.com/photo-1576675466969-38eeae4b41f6',
			},
			{
				id: 'p4',
				url: 'https://images.unsplash.com/photo-1525438160292-a4a860951216',
			},
		],
		rating: 4.5,
		category: 'landmark',
	},
	{
		id: '2',
		title: '경복궁',
		description: '조선왕조의 법궁, 한국의 대표적인 전통 건축물',
		address: '서울특별시 종로구 사직로 161',
		coordinates: {
			lat: 37.5796,
			lng: 126.977,
		},
		photos: [
			{
				id: 'p2',
				url: 'https://images.unsplash.com/photo-1578637387939-43c525550085',
			},
		],
		rating: 4.8,
		category: 'historic',
	},
	{
		id: '3',
		title: 'Eiffel Tower',
		description:
			'The iconic symbol of Paris and one of the most famous landmarks in the world',
		address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
		coordinates: {
			lat: 48.8584,
			lng: 2.2945,
		},
		photos: [
			{
				id: 'p3',
				url: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f',
			},
		],
		rating: 4.7,
		category: 'landmark',
	},
	{
		id: '4',
		title: '아라시야마 대나무 숲',
		description: '교토의 대표적인 자연 명소, 환상적인 대나무 길',
		address: '京都府京都市右京区嵯峨天龍寺芒ノ馬場町',
		coordinates: {
			lat: 35.017,
			lng: 135.6717,
		},
		photos: [
			{
				id: 'p4',
				url: 'https://images.unsplash.com/photo-1576675466969-38eeae4b41f6',
			},
		],
		rating: 4.6,
		category: 'nature',
	},
	{
		id: '5',
		title: 'Central Park',
		description: 'An urban oasis in the heart of New York City',
		address: 'Manhattan, New York, NY, USA',
		coordinates: {
			lat: 40.7829,
			lng: -73.9654,
		},
		photos: [
			{
				id: 'p5',
				url: 'https://images.unsplash.com/photo-1545338072-d12de5052d5b',
			},
		],
		rating: 4.8,
		category: 'park',
	},
	{
		id: '6',
		title: 'Wat Arun',
		description: 'The Temple of Dawn, a stunning riverside landmark',
		address:
			'158 Thanon Wang Doem, Wat Arun, Bangkok Yai, Bangkok 10600, Thailand',
		coordinates: {
			lat: 13.7437,
			lng: 100.4888,
		},
		photos: [
			{
				id: 'p6',
				url: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed',
			},
		],
		rating: 4.5,
		category: 'historic',
	},
	{
		id: '7',
		title: 'Hardware Société',
		description: 'Iconic Melbourne café known for its unique brunch offerings',
		address: '120 Hardware St, Melbourne VIC 3000, Australia',
		coordinates: {
			lat: -37.8136,
			lng: 144.9631,
		},
		photos: [
			{
				id: 'p7',
				url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
			},
		],
		rating: 4.4,
		category: 'street',
	},
	{
		id: '8',
		title: 'Burj Khalifa',
		description: "The world's tallest building with breathtaking city views",
		address: '1 Sheikh Mohammed bin Rashid Blvd, Dubai, UAE',
		coordinates: {
			lat: 25.1972,
			lng: 55.2744,
		},
		photos: [
			{
				id: 'p8',
				url: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5',
			},
		],
		rating: 4.7,
		category: 'landmark',
	},
	{
		id: '9',
		title: 'Piazza San Marco',
		description:
			'The principal public square of Venice with historic architecture',
		address: 'P.za San Marco, 30100 Venezia VE, Italy',
		coordinates: {
			lat: 45.4341,
			lng: 12.3388,
		},
		photos: [
			{
				id: 'p9',
				url: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9',
			},
		],
		rating: 4.9,
		category: 'culture',
	},
	{
		id: '10',
		title: 'Gardens by the Bay',
		description: 'Futuristic nature park with iconic Supertree Grove',
		address: '18 Marina Gardens Dr, Singapore 018953',
		coordinates: {
			lat: 1.2816,
			lng: 103.8636,
		},
		photos: [
			{
				id: 'p10',
				url: 'https://images.unsplash.com/photo-1574227492706-f65b24c3688a',
			},
		],
		rating: 4.8,
		category: 'park',
	},
	{
		id: '11',
		title: 'Winkel 43',
		description: 'Famous café known for the best apple pie in Amsterdam',
		address: 'Noordermarkt 43, 1015 NA Amsterdam, Netherlands',
		coordinates: {
			lat: 52.3799,
			lng: 4.8872,
		},
		photos: [
			{
				id: 'p11',
				url: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8',
			},
		],
		rating: 4.6,
		category: 'local',
	},
	{
		id: '12',
		title: '성산일출봉',
		description: '유네스코 세계자연유산, 장엄한 일출 명소',
		address: '제주특별자치도 서귀포시 성산읍 성산리',
		coordinates: {
			lat: 33.4587,
			lng: 126.9425,
		},
		photos: [
			{
				id: 'p12',
				url: 'https://images.unsplash.com/photo-1588587789343-c1f1a4435c7c',
			},
		],
		rating: 4.7,
		category: 'nature',
	},

	{
		id: '13',
		title: 'Duplicate Spot 1',
		description: 'This is a duplicate spot for clustering test',
		address: 'Test Address 1',
		coordinates: {
			lat: 37.4, // 남산 서울타워와 동일한 좌표
			lng: 126.9882,
		},
		photos: [
			{
				id: 'p13',
				url: 'https://images.unsplash.com/photo-1617541086271-4d43983704bd',
			},
		],
		rating: 4.5,
		category: 'landmark',
	},
	{
		id: '14',
		title: 'Duplicate Spot 2',
		description: 'This is another duplicate spot for clustering test',
		address: 'Test Address 2',
		coordinates: {
			lat: 37.5511, // 남산 서울타워와 동일한 좌표
			lng: 126.9882,
		},
		photos: [
			{
				id: 'p14',
				url: 'https://images.unsplash.com/photo-1578637387939-43c525550085',
			},
		],
		rating: 4.5,
		category: 'landmark',
	},
	{
		id: '15',
		title: 'Duplicate Spot 3',
		description: 'Yet another duplicate spot for clustering test',
		address: 'Test Address 3',
		coordinates: {
			lat: 37.6, // 남산 서울타워와 동일한 좌표
			lng: 126.9882,
		},
		photos: [
			{
				id: 'p15',
				url: 'https://images.unsplash.com/photo-1576675466969-38eeae4b41f6',
			},
		],
		rating: 4.5,
		category: 'landmark',
	},
	// 추가적인 중복 데이터
	{
		id: '16',
		title: 'Duplicate Spot 4',
		description: 'Another duplicate spot for clustering test',
		address: 'Test Address 4',
		coordinates: {
			lat: 37.8, // 남산 서울타워와 동일한 좌표
			lng: 126.9882,
		},
		photos: [
			{
				id: 'p16',
				url: 'https://images.unsplash.com/photo-1525438160292-a4a860951216',
			},
		],
		rating: 4.5,
		category: 'landmark',
	},
	{
		id: '17',
		title: 'Duplicate Spot 5',
		description: 'Final duplicate spot for clustering test',
		address: 'Test Address 5',
		coordinates: {
			lat: 37.9, // 남산 서울타워와 동일한 좌표
			lng: 126.9882,
		},
		photos: [
			{
				id: 'p17',
				url: 'https://images.unsplash.com/photo-1525438160292-a4a860951216',
			},
		],
		rating: 4.5,
		category: 'landmark',
	},
];

export function SpotList() {
	const [selectedCategory, setSelectedCategory] =
		useState<CategoryValue>('all');
	const [searchQuery, setSearchQuery] = useState('');
	const [isMapView, setIsMapView] = useState(false);
	const [isListVisible, setIsListVisible] = useState(false);

	const filteredSpots = MOCK_SPOTS.filter((spot) => {
		const matchesCategory =
			selectedCategory === 'all' || spot.category === selectedCategory;
		const matchesSearch =
			spot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			spot.address.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	return (
		<>
			<Box as='header' className={styles.header}>
				<Container>
					<Box className={styles.headerContent}>
						<SearchBar value={searchQuery} onChange={setSearchQuery} />
						<Box
							as='button'
							className={styles.viewToggle}
							onClick={() => {
								setIsMapView(!isMapView);
								setIsListVisible(false);
							}}
						>
							{isMapView ? (
								<IoGridOutline size={20} />
							) : (
								<IoMapOutline size={20} />
							)}
						</Box>
					</Box>
				</Container>
			</Box>

			<CategoryFilter />

			<Box as='main' className={styles.main}>
				{isMapView ? (
					<Box className={styles.mapView}>
						<Box className={styles.mapSection}>
							<SpotMap
								spots={filteredSpots}
								onShowListClick={() => setIsListVisible(!isListVisible)}
								isListVisible={isListVisible}
							/>
						</Box>

						{isListVisible && (
							<Box className={styles.slideUpList}>
								{filteredSpots.map((spot) => (
									<SpotCard key={spot.id} spot={spot} />
								))}
							</Box>
						)}
					</Box>
				) : (
					<Container>
						<Box className={styles.gridView}>
							{filteredSpots.map((spot) => (
								<SpotCard key={spot.id} spot={spot} />
							))}
						</Box>
					</Container>
				)}
			</Box>
		</>
	);
}
