'use client';

import { Box, Container } from '@jung/design-system/components';
import { useState } from 'react';
import { IoGridOutline, IoMapOutline } from 'react-icons/io5';
import { CategoryFilter, type CategoryValue } from './CategoryFilter';
import { SearchBar } from './SearchBar';
import { SpotCard } from './SpotCard';
import * as styles from './SpotList.css';

export type SpotCategory = 'nature' | 'urban' | 'cafe' | 'historic' | 'night';

export interface Spot {
	id: string;
	name: string;
	description: string;
	address: string;
	photos: {
		id: string;
		url: string;
		authorId: string;
	}[];
	rating: number;
	reviewCount: number;
	category: SpotCategory;
}

export const MOCK_SPOTS: Spot[] = [
	// 서울
	{
		id: '1',
		name: '남산 서울타워',
		description: '서울의 상징적인 랜드마크이자 최고의 야경 명소',
		address: '서울특별시 용산구 남산공원길 105',
		photos: [
			{
				id: 'p1',
				url: 'https://images.unsplash.com/photo-1617541086271-4d43983704bd',
				authorId: 'user1',
			},
		],
		rating: 4.5,
		reviewCount: 1283,
		category: 'night',
	},
	{
		id: '2',
		name: '경복궁',
		description: '조선왕조의 법궁, 한국의 대표적인 전통 건축물',
		address: '서울특별시 종로구 사직로 161',
		photos: [
			{
				id: 'p2',
				url: 'https://images.unsplash.com/photo-1578637387939-43c525550085',
				authorId: 'user2',
			},
		],
		rating: 4.8,
		reviewCount: 2561,
		category: 'historic',
	},
	// 파리
	{
		id: '3',
		name: 'Eiffel Tower',
		description:
			'The iconic symbol of Paris and one of the most famous landmarks in the world',
		address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
		photos: [
			{
				id: 'p3',
				url: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e',
				authorId: 'user3',
			},
		],
		rating: 4.7,
		reviewCount: 5426,
		category: 'urban',
	},
	// 교토
	{
		id: '4',
		name: '아라시야마 대나무 숲',
		description: '교토의 대표적인 자연 명소, 환상적인 대나무 길',
		address: '京都府京都市右京区嵯峨天龍寺芒ノ馬場町',
		photos: [
			{
				id: 'p4',
				url: 'https://images.unsplash.com/photo-1576675466969-38eeae4b41f6',
				authorId: 'user4',
			},
		],
		rating: 4.6,
		reviewCount: 3421,
		category: 'nature',
	},
	// 뉴욕
	{
		id: '5',
		name: 'Central Park',
		description: 'An urban oasis in the heart of New York City',
		address: 'Manhattan, New York, NY, USA',
		photos: [
			{
				id: 'p5',
				url: 'https://images.unsplash.com/photo-1545338072-d12de5052d5b',
				authorId: 'user5',
			},
		],
		rating: 4.8,
		reviewCount: 8752,
		category: 'nature',
	},
	// 방콕
	{
		id: '6',
		name: 'Wat Arun',
		description: 'The Temple of Dawn, a stunning riverside landmark',
		address:
			'158 Thanon Wang Doem, Wat Arun, Bangkok Yai, Bangkok 10600, Thailand',
		photos: [
			{
				id: 'p6',
				url: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed',
				authorId: 'user6',
			},
		],
		rating: 4.5,
		reviewCount: 2845,
		category: 'historic',
	},
	// 멜버른
	{
		id: '7',
		name: 'Hardware Société',
		description: 'Iconic Melbourne café known for its unique brunch offerings',
		address: '120 Hardware St, Melbourne VIC 3000, Australia',
		photos: [
			{
				id: 'p7',
				url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
				authorId: 'user7',
			},
		],
		rating: 4.4,
		reviewCount: 1567,
		category: 'cafe',
	},
	// 두바이
	{
		id: '8',
		name: 'Burj Khalifa',
		description: "The world's tallest building with breathtaking city views",
		address: '1 Sheikh Mohammed bin Rashid Blvd, Dubai, UAE',
		photos: [
			{
				id: 'p8',
				url: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5',
				authorId: 'user8',
			},
		],
		rating: 4.7,
		reviewCount: 6234,
		category: 'night',
	},
	// 베니스
	{
		id: '9',
		name: 'Piazza San Marco',
		description:
			'The principal public square of Venice with historic architecture',
		address: 'P.za San Marco, 30100 Venezia VE, Italy',
		photos: [
			{
				id: 'p9',
				url: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9',
				authorId: 'user9',
			},
		],
		rating: 4.9,
		reviewCount: 4521,
		category: 'historic',
	},
	// 싱가포르
	{
		id: '10',
		name: 'Gardens by the Bay',
		description: 'Futuristic nature park with iconic Supertree Grove',
		address: '18 Marina Gardens Dr, Singapore 018953',
		photos: [
			{
				id: 'p10',
				url: 'https://images.unsplash.com/photo-1574227492706-f65b24c3688a',
				authorId: 'user10',
			},
		],
		rating: 4.8,
		reviewCount: 7845,
		category: 'urban',
	},
	// 암스테르담
	{
		id: '11',
		name: 'Winkel 43',
		description: 'Famous café known for the best apple pie in Amsterdam',
		address: 'Noordermarkt 43, 1015 NA Amsterdam, Netherlands',
		photos: [
			{
				id: 'p11',
				url: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8',
				authorId: 'user11',
			},
		],
		rating: 4.6,
		reviewCount: 2134,
		category: 'cafe',
	},
	// 제주
	{
		id: '12',
		name: '성산일출봉',
		description: '유네스코 세계자연유산, 장엄한 일출 명소',
		address: '제주특별자치도 서귀포시 성산읍 성산리',
		photos: [
			{
				id: 'p12',
				url: 'https://images.unsplash.com/photo-1588587789343-c1f1a4435c7c',
				authorId: 'user12',
			},
		],
		rating: 4.7,
		reviewCount: 3567,
		category: 'nature',
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
			spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

			<Box className={styles.categorySection}>
				<CategoryFilter />
			</Box>

			<Box as='main' className={styles.main}>
				{isMapView ? (
					<Box className={styles.mapView}>
						<Box className={styles.mapSection}>
							{/* 구글 맵 컴포넌트 추가 예정 */}
							<Box className={styles.mapPlaceholder}>Map view coming soon</Box>
						</Box>

						<button
							className={styles.listToggle}
							onClick={() => setIsListVisible(!isListVisible)}
						>
							{isListVisible ? 'Hide List' : 'Show List'}
						</button>

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
