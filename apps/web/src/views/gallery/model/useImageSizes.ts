import { useEffect, useState } from 'react';

interface UseImageSizesProps {
	width: number;
	height: number;
	isModal?: boolean;
	containerWidthFactor?: number;
	imageWrapperWidthFactor?: number;
	heightLimitFactor?: number;
}

export function useImageSizes({
	width,
	height,
	isModal = false,
	containerWidthFactor = 0.9,
	imageWrapperWidthFactor = 0.65,
	heightLimitFactor = 0.75,
}: UseImageSizesProps) {
	const [imageSizes, setImageSizes] = useState('100vw');

	useEffect(() => {
		if (!width || !height) return;

		const handleResize = () => {
			if (!isModal) {
				setImageSizes('(max-width: 768px) 100vw, 1024px');
				return;
			}

			const aspectRatio = width / height;
			const heightLimit = window.innerHeight * heightLimitFactor;
			const widthLimit =
				window.innerWidth *
				containerWidthFactor *
				(isModal ? imageWrapperWidthFactor : 1);

			const calculatedWidth = Math.min(heightLimit * aspectRatio, widthLimit);
			setImageSizes(
				`(min-width: 768px) ${Math.round(calculatedWidth)}px, 100vw`,
			);
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [
		width,
		height,
		isModal,
		containerWidthFactor,
		imageWrapperWidthFactor,
		heightLimitFactor,
	]);

	return { imageSizes };
}
