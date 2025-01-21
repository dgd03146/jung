import { useMarkerVisibility } from '@/fsd/features/spots/model';

import { capitalizeFirstLetter } from '@/fsd/shared';
import { Tag, Typography } from '@jung/design-system/components';
import type { SpotCategory } from '@jung/shared/types';
import { Marker, OverlayView } from '@react-google-maps/api';
import { useState } from 'react';
import CategoryIcon from './CategoryIcon';
import * as styles from './SpotMap.css';

interface CustomMarkerProps {
	position: google.maps.LatLngLiteral;
	category: string;
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
								<Tag variant='secondary' marginBottom='1'>
									<Typography.SubText
										level={3}
										fontWeight='semibold'
										borderRadius='lg'
									>
										{capitalizeFirstLetter(category)}
									</Typography.SubText>
								</Tag>

								<Typography.SubText fontWeight='bold' color='black300'>
									{title}
								</Typography.SubText>
							</div>
						)}
						<div
							className={styles.customMarker({
								category: category as SpotCategory,
								selected: isSelected,
							})}
							onClick={handleClick}
						>
							<CategoryIcon category={category as SpotCategory} />
						</div>
					</div>
				</OverlayView>
			)}
		</>
	);
};

export default CustomMarker;
