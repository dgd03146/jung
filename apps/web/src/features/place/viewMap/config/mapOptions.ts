export const mapOptions: google.maps.MapOptions = {
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
};
