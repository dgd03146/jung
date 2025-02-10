import type { MarkerClustererProps } from '@react-google-maps/api';
import * as styles from '../ui/ViewMap.css';

export const markerClusterOptions: MarkerClustererProps['options'] = {
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
};
