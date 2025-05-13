'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

interface UseImageSizesProps {
	width: number;
	height: number;
	isModal?: boolean;
}

const IMAGE_SIZE_CONFIG = {
	heightLimitFactor: 0.75,

	fallbackHeight: 768,
	IMAGE_MAX_ABSOLUTE_WIDTH_PX: 650,
	GALLERY_MAX_WIDTH_PX: 600,
};

export function useImageSizes({
	width,
	height,
	isModal = false,
}: UseImageSizesProps) {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [actualContainerWidth, setActualContainerWidth] = useState<number>(0);
	const [viewportHeight, setViewportHeight] = useState<number>(
		IMAGE_SIZE_CONFIG.fallbackHeight,
	);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const updateViewportHeight = () => {
			setViewportHeight(window.innerHeight);
		};

		updateViewportHeight();
		window.addEventListener('resize', updateViewportHeight);
		return () => window.removeEventListener('resize', updateViewportHeight);
	}, []);

	useEffect(() => {
		const currentElement = containerRef.current;
		if (!currentElement) return;

		const observer = new ResizeObserver(([entry]) => {
			const newWidth = entry?.contentRect.width;
			if (newWidth) {
				setActualContainerWidth((prevWidth) => {
					if (Math.abs(newWidth - prevWidth) > 1) {
						return newWidth;
					}
					return prevWidth;
				});
			}
		});

		observer.observe(currentElement);
		return () => {
			if (currentElement) {
				observer.unobserve(currentElement);
			}
			observer.disconnect();
		};
	}, []);

	const imageSizes = useMemo(() => {
		if (
			!width ||
			!height ||
			width <= 1 ||
			height <= 1 ||
			!actualContainerWidth ||
			actualContainerWidth <= 0
		) {
			return '100vw';
		}

		if (!isModal) {
			return `
        (max-width: ${IMAGE_SIZE_CONFIG.GALLERY_MAX_WIDTH_PX}px) 100vw,
        ${IMAGE_SIZE_CONFIG.GALLERY_MAX_WIDTH_PX}px
      `;
		}

		const aspectRatio = width / height;

		const heightLimit = viewportHeight * IMAGE_SIZE_CONFIG.heightLimitFactor;

		let calculatedWidth = Math.min(
			heightLimit * aspectRatio,
			actualContainerWidth,
		);

		calculatedWidth = Math.min(
			calculatedWidth,
			IMAGE_SIZE_CONFIG.IMAGE_MAX_ABSOLUTE_WIDTH_PX,
		);

		const finalCalculatedWidth = Math.max(1, calculatedWidth);

		return `${Math.round(finalCalculatedWidth)}px`;
	}, [width, height, isModal, actualContainerWidth, viewportHeight]);

	return { imageSizes, containerRef };
}
