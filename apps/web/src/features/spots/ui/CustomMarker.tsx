import { useMarkerVisibility } from '@/fsd/features/spots/model';
import type { SpotCategory } from '@jung/shared/types';
import { Marker, OverlayView } from '@react-google-maps/api';
import { useState } from 'react';
import CategoryIcon from './CategoryIcon';
import * as styles from './SpotMap.css';

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
	const [isHovered, setIsHovered] = useState(false);

	const isVisible = useMarkerVisibility(clusterer, position);

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		onClick();
	};

	return (
		<>
			<Marker
				position={position}
				clusterer={clusterer}
				visible={false}
				icon={{ path: google.maps.SymbolPath.CIRCLE, scale: 0 }}
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
									<CategoryIcon category={category} />
									<span>{category}</span>
								</div>
								<div className={styles.tooltipTitle}>{title}</div>
							</div>
						)}
						<div
							className={styles.customMarker({
								category,
								selected: isSelected,
							})}
							onClick={handleClick}
						>
							<div className={styles.markerIcon}>
								<CategoryIcon category={category} />
							</div>
						</div>
					</div>
				</OverlayView>
			)}
		</>
	);
};

export default CustomMarker;
