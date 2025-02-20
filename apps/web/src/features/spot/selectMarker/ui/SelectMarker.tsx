import { CategoryIcon } from '@/fsd/entities/spot';
import { useMarkerStore } from '@/fsd/features/spot';
import { capitalizeFirstLetter } from '@/fsd/shared';
import { Tag, Typography } from '@jung/design-system/components';
import type { Spot, SpotCategory } from '@jung/shared/types';
import { Marker, OverlayView } from '@react-google-maps/api';
import type { Clusterer } from '@react-google-maps/marker-clusterer';
import { useState } from 'react';
import { useMarkerVisibility } from '../model/useMarkerVisibility';
import * as styles from './SelectMarker.css';

interface SelectMarkerProps {
	spot: Spot;
	clusterer: Clusterer;
}

export const SelectMarker = ({ spot, clusterer }: SelectMarkerProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const isVisible = useMarkerVisibility(clusterer, spot.coordinates);

	const { selectedMarker, handleMarkerClick } = useMarkerStore();

	const isSelected = selectedMarker?.id === spot.id;

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		handleMarkerClick(spot);
	};

	return (
		<>
			<Marker
				position={spot.coordinates}
				clusterer={clusterer}
				visible={false}
				icon={{ path: google.maps.SymbolPath.CIRCLE, scale: 0 }}
			/>
			{isVisible && (
				<OverlayView
					position={spot.coordinates}
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
								<Tag variant='secondary' marginBottom='1'>
									<Typography.SubText
										level={3}
										fontWeight='semibold'
										borderRadius='lg'
									>
										{capitalizeFirstLetter(spot.category)}
									</Typography.SubText>
								</Tag>

								<Typography.SubText fontWeight='bold' color='black300'>
									{spot.title}
								</Typography.SubText>
							</div>
						)}
						<div
							className={styles.customMarker({
								category: spot.category.toLowerCase() as SpotCategory,
								selected: isSelected,
							})}
							onClick={handleClick}
						>
							<CategoryIcon
								category={spot.category.toLowerCase() as SpotCategory}
							/>
						</div>
					</div>
				</OverlayView>
			)}
		</>
	);
};
