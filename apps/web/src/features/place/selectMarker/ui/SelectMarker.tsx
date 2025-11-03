'use client';

import { CategoryIcon } from '@/fsd/entities/place';
import { useMarker } from '@/fsd/features/place';
import { capitalizeFirstLetter } from '@/fsd/shared';
import { Tag, Typography } from '@jung/design-system/components';
import type { Place } from '@jung/shared/types';
import { Marker, OverlayView } from '@react-google-maps/api';
import type { Clusterer } from '@react-google-maps/marker-clusterer';
import { useState } from 'react';
import { useMarkerVisibility } from '../model/useMarkerVisibility';
import * as styles from './SelectMarker.css';

interface SelectMarkerProps {
	place: Place;
	clusterer: Clusterer;
}

export const SelectMarker = ({ place, clusterer }: SelectMarkerProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const isVisible = useMarkerVisibility(clusterer, place.coordinates);

	const { selectedMarker, handleMarkerClick } = useMarker();

	const isSelected = selectedMarker?.id === place.id;

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		handleMarkerClick(place);
	};

	return (
		<>
			<Marker
				position={place.coordinates}
				clusterer={clusterer}
				visible={false}
				icon={{ path: google.maps.SymbolPath.CIRCLE, scale: 0 }}
			/>
			{isVisible && (
				<OverlayView
					position={place.coordinates}
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
										{capitalizeFirstLetter(place.category)}
									</Typography.SubText>
								</Tag>

								<Typography.SubText fontWeight='bold' color='black300'>
									{place.title}
								</Typography.SubText>
							</div>
						)}
						<div
							className={styles.customMarker({
								category: (place.category?.toLowerCase() || 'nature') as
									| 'nature'
									| 'landmark'
									| 'historic'
									| 'culture'
									| 'night'
									| 'street'
									| 'park'
									| 'local'
									| 'restaurant'
									| 'museum'
									| 'shopping'
									| 'beach'
									| 'sports'
									| 'entertainment'
									| 'religious'
									| 'viewpoint'
									| 'hotel'
									| 'transport',
								selected: isSelected,
							})}
							onClick={handleClick}
						>
							<CategoryIcon category={place.category?.toLowerCase() || ''} />
						</div>
					</div>
				</OverlayView>
			)}
		</>
	);
};
