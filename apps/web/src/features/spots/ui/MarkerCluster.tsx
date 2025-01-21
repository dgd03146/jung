import type { Spot } from '@jung/shared/types';
import { MarkerClusterer } from '@react-google-maps/api';
import CustomMarker from './CustomMarker';
import * as styles from './SpotMap.css';

interface MarkerClusterProps {
	markersData: Spot[];
	selectedMarkerId: string | null;
	handleMarkerClick: (markerSpot: Spot) => void;
}

const MarkerCluster = ({
	markersData,
	selectedMarkerId,
	handleMarkerClick,
}: MarkerClusterProps) => {
	if (markersData.length < 3) {
		return (
			<>
				{markersData.map((markerSpot) => {
					return (
						<CustomMarker
							key={markerSpot.id}
							title={markerSpot.title}
							position={markerSpot.coordinates}
							category={markerSpot.category.toLowerCase()}
							isSelected={selectedMarkerId === markerSpot.id}
							onClick={() => handleMarkerClick(markerSpot)}
						/>
					);
				})}
			</>
		);
	}

	return (
		<MarkerClusterer
			options={{
				gridSize: 60,
				minimumClusterSize: 2,
				maxZoom: 13,
				averageCenter: true,
				ignoreHidden: false,
				zoomOnClick: true,
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
					{markersData.map((markerSpot) => {
						return (
							<CustomMarker
								key={markerSpot.id}
								title={markerSpot.title}
								position={markerSpot.coordinates}
								category={markerSpot.category}
								isSelected={selectedMarkerId === markerSpot.id}
								onClick={() => handleMarkerClick(markerSpot)}
								clusterer={clusterer}
							/>
						);
					})}
				</>
			)}
		</MarkerClusterer>
	);
};

export default MarkerCluster;
