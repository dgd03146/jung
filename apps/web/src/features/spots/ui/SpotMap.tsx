'use client';

import {
	GoogleMap,
	InfoWindow,
	Marker,
	MarkerClusterer,
	OverlayView,
} from '@react-google-maps/api';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
	MdForest, // park
	MdLocalCafe, // local
	MdLocationCity, // landmark
	MdNightlife, // night
	MdPark, // nature
	MdStorefront, // street
	MdTempleHindu, // historic
	MdTheaterComedy, // culture
} from 'react-icons/md';
import { SpotCard } from './SpotCard';
import type { Spot, SpotCategory } from './SpotList';
import * as styles from './SpotMap.css';

interface SpotMapProps {
	spots?: Spot[];
	spot?: Spot;
	initialCenter?: google.maps.LatLngLiteral;
	onShowListClick?: () => void;

	isListVisible?: boolean;
}

const getCategoryIcon = (category: SpotCategory) => {
	const iconProps = {
		size: 20,
		color: 'currentColor',
		style: {
			filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))',
		},
	};

	switch (category) {
		case 'nature':
			return <MdForest {...iconProps} />;
		case 'landmark':
			return <MdLocationCity {...iconProps} />;
		case 'historic':
			return <MdTempleHindu {...iconProps} />;
		case 'culture':
			return <MdTheaterComedy {...iconProps} />;
		case 'night':
			return <MdNightlife {...iconProps} />;
		case 'street':
			return <MdStorefront {...iconProps} />;
		case 'park':
			return <MdPark {...iconProps} />;
		case 'local':
			return <MdLocalCafe {...iconProps} />;
		default:
			return <MdLocationCity {...iconProps} />;
	}
};

interface CustomMarkerProps {
	position: google.maps.LatLngLiteral;
	category: SpotCategory;
	isSelected: boolean;
	title: string;
	onClick: () => void;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	clusterer: any;
}

const CustomMarker = ({
	position,
	category,
	isSelected,
	onClick,
	title,
	clusterer,
}: CustomMarkerProps) => {
	const [isVisible, setIsVisible] = useState(true);
	const [isHovered, setIsHovered] = useState(false);

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation(); // 이벤트 전파 중단
		onClick();
	};

	useEffect(() => {
		if (!clusterer) {
			setIsVisible(true);
			return;
		}

		const map = clusterer.getMap();
		if (!map) return;

		const checkClusterStatus = () => {
			const clusters = clusterer.getClusters();
			let foundInCluster = false;

			for (const cluster of clusters) {
				if (cluster.getSize() > 1) {
					// 클러스터에 2개 이상의 마커가 있는 경우
					const markers = cluster.getMarkers();
					for (const marker of markers) {
						const pos = marker.getPosition();
						if (pos.lat() === position.lat && pos.lng() === position.lng) {
							foundInCluster = true;
						}
					}
				}
			}

			setIsVisible(!foundInCluster); // 클러스터에 없으면 항상 보이게
		};

		checkClusterStatus();

		const clusteringEndListener = clusterer.addListener(
			'clusteringend',
			checkClusterStatus,
		);
		const zoomChangedListener = map.addListener(
			'zoom_changed',
			checkClusterStatus,
		);

		return () => {
			google.maps.event.removeListener(clusteringEndListener);
			google.maps.event.removeListener(zoomChangedListener);
		};
	}, [clusterer, position]);

	return (
		<>
			<Marker
				position={position}
				clusterer={clusterer}
				visible={false}
				icon={{
					path: google.maps.SymbolPath.CIRCLE,
					scale: 0,
				}}
			/>
			{isVisible && (
				<OverlayView
					position={position}
					mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
					getPixelPositionOffset={(width, height) => ({
						x: -(width / 2),
						y: -(height / 2),
					})}
				>
					<div
						className={styles.markerContainer}
						onMouseEnter={() => !isSelected && setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
					>
						{isHovered && !isSelected && (
							<div className={styles.markerTooltip}>
								<div className={styles.tooltipCategory}>
									{getCategoryIcon(category)}
									<span>{category}</span>
								</div>
								<div className={styles.tooltipTitle}>{title}</div>
							</div>
						)}
						<div
							className={styles.customMarker({
								category: category,
								selected: isSelected,
							})}
							onClick={handleClick}
						>
							<div className={styles.markerIcon}>
								{getCategoryIcon(category)}
							</div>
						</div>
					</div>
				</OverlayView>
			)}
		</>
	);
};

export function SpotMap({
	spots,
	spot,
	initialCenter,
	onShowListClick,
	isListVisible,
}: SpotMapProps) {
	const [selectedMarker, setSelectedMarker] = useState<Spot | null>(null);
	const [currentCenter, setCurrentCenter] =
		useState<google.maps.LatLngLiteral | null>(null);
	const [currentZoom, setCurrentZoom] = useState<number | null>(null);

	const mapOptions = useMemo(
		() => ({
			disableDefaultUI: true,
			zoomControl: true,
			fullscreenControl: false,
			streetViewControl: false,
			mapTypeControl: false,
			gestureHandling: 'greedy',
			styles: [
				{
					featureType: 'water',
					elementType: 'geometry',
					stylers: [{ color: '#CAE1FF' }],
				},
				{
					featureType: 'landscape',
					elementType: 'geometry',
					stylers: [{ color: '#FFFFFF' }],
				},
				{
					featureType: 'road.highway',
					elementType: 'geometry',
					stylers: [
						{ color: '#F1F5F9' }, // 고속도로
						{ visibility: 'on' },
					],
				},
				{
					featureType: 'road.arterial',
					elementType: 'geometry',
					stylers: [
						{ color: '#F8FAFC' }, // 주요 도로
						{ visibility: 'on' },
					],
				},
				{
					featureType: 'road',
					elementType: 'labels.text.fill',
					stylers: [{ color: '#94A3B8' }], // 도로명
				},
				{
					featureType: 'poi.park',
					elementType: 'geometry',
					stylers: [
						{ color: '#F1F9F5' }, // 공원
						{ visibility: 'on' },
					],
				},
				{
					featureType: 'poi.business',
					stylers: [{ visibility: 'on' }],
				},
				{
					featureType: 'poi',
					elementType: 'labels.text.fill',
					stylers: [{ color: '#64748B' }], // POI 라벨
				},
				{
					featureType: 'administrative.country',
					elementType: 'geometry.stroke',
					stylers: [
						{ color: '#94A3B8' }, // 국가 경계선
						{ weight: 0.5 },
					],
				},
				{
					featureType: 'administrative.country',
					elementType: 'labels.text.fill',
					stylers: [{ color: '#334155' }], // 국가명
				},
				{
					featureType: 'administrative.locality',
					elementType: 'labels.text.fill',
					stylers: [{ color: '#334155' }], // 도시명
				},
				{
					featureType: 'transit.station',
					stylers: [{ visibility: 'on' }], // 역 표시
				},
				{
					featureType: 'transit.station',
					elementType: 'labels.text.fill',
					stylers: [{ color: '#64748B' }],
				},
				{
					elementType: 'labels.text.stroke',
					stylers: [{ color: '#FFFFFF' }, { weight: 2 }],
				},
				{
					elementType: 'labels.text',
					stylers: [{ weight: 400 }],
				},
			],
		}),
		[],
	);

	const markersData = useMemo(() => {
		if (spot) return [spot];
		return spots || [];
	}, [spots, spot]);

	const { center: initialMapCenter, zoom: initialMapZoom } = useMemo(() => {
		if (currentCenter && currentZoom) {
			return { center: currentCenter, zoom: currentZoom };
		}

		if (initialCenter) {
			return { center: initialCenter, zoom: 15 };
		}

		if (spot) {
			return { center: spot.coordinates, zoom: 15 };
		}

		if (!markersData.length) {
			return {
				center: { lat: 36.5, lng: 127.5 }, // 한국
				zoom: 7,
			};
		}

		if (markersData.length === 1) {
			return {
				center: markersData[0]?.coordinates,
				zoom: 15,
			};
		}

		// TODO: 에어비앤비 스타일로 변경하기
		// - bounds 계산으로 모든 마커가 보이게 하기
		// - 마커 주변에 패딩 추가
		// - 지도 크기에 따른 적절한 줌 레벨 자동 계산

		// Reference: https://www.airbnb.com/
		return {
			center: { lat: 45, lng: 60 }, // 유럽과 한국 사이 중간 지점
			zoom: 3,
		};
	}, [initialCenter, spot, markersData, currentCenter, currentZoom]);
	if (!markersData.length) {
		return (
			<div className={styles.loadingContainer}>
				<p>No locations available</p>
			</div>
		);
	}

	const mapRef = useRef<google.maps.Map | null>(null);

	const onLoad = useCallback((map: google.maps.Map) => {
		mapRef.current = map;
	}, []);

	const onUnmount = useCallback(() => {
		mapRef.current = null;
	}, []);

	const onMapChange = useCallback(() => {
		if (!mapRef.current) return;

		const newCenter = mapRef.current.getCenter()?.toJSON();
		const newZoom = mapRef.current.getZoom();

		if (newCenter) setCurrentCenter(newCenter);
		if (newZoom) setCurrentZoom(newZoom);
	}, []);

	const onMapClick = useCallback(() => {
		setSelectedMarker(null);
	}, []);

	const handleMarkerClick = useCallback((markerSpot: Spot) => {
		setSelectedMarker((prev) =>
			prev?.id === markerSpot.id ? null : markerSpot,
		);
	}, []);

	return (
		<div className={styles.mapContainer}>
			<GoogleMap
				mapContainerClassName={styles.map}
				center={currentCenter || initialMapCenter}
				zoom={currentZoom || initialMapZoom}
				onLoad={onLoad}
				onUnmount={onUnmount}
				onDragEnd={onMapChange}
				onZoomChanged={onMapChange}
				options={mapOptions}
				onClick={onMapClick}
			>
				<MarkerClusterer
					options={{
						gridSize: 60,
						minimumClusterSize: 3,
						maxZoom: 10,
						averageCenter: true,
						ignoreHidden: false,
						// zoomOnClick: true,

						styles: [
							{
								textColor: '#FFFFFF',
								textSize: 16,
								height: 40,
								width: 40,
								className: styles.markerCluster,
								url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
							},
							{
								textColor: '#FFFFFF',
								textSize: 17,
								height: 44,
								width: 44,
								className: `${styles.markerCluster} ${styles.markerClusterMedium}`,
								url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
							},
							{
								textColor: '#FFFFFF',
								textSize: 18,
								height: 48,
								width: 48,
								className: `${styles.markerCluster} ${styles.markerClusterLarge}`,
								url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
							},
						],
					}}
				>
					{(clusterer) => (
						<>
							{markersData.map((markerSpot) => (
								<CustomMarker
									key={markerSpot.id}
									title={markerSpot.title}
									position={markerSpot.coordinates}
									category={markerSpot.category}
									isSelected={selectedMarker?.id === markerSpot.id}
									onClick={() => handleMarkerClick(markerSpot)}
									clusterer={clusterer}
								/>
							))}
						</>
					)}
				</MarkerClusterer>

				{selectedMarker && (
					<InfoWindow
						position={selectedMarker.coordinates}
						onCloseClick={() => setSelectedMarker(null)}
					>
						<SpotCard spot={selectedMarker} variant='compact' />
					</InfoWindow>
				)}
			</GoogleMap>

			<button onClick={onShowListClick} className={styles.showListButton}>
				{isListVisible ? 'Hide list' : 'Show list'}
			</button>
		</div>
	);
}
