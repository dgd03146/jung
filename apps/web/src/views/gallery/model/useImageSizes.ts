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
	const rafRef = useRef<number>(0);
	const [imageSizes, setImageSizes] = useState('100vw');

	const isValidDimensions = width > 1 && height > 1 && actualContainerWidth > 0;

	useEffect(() => {
		if (typeof window === 'undefined') return;

		setViewportHeight(window.innerHeight);
	}, []);

	useEffect(() => {
		const currentElement = containerRef.current;

		if (!currentElement) return;

		const observer = new ResizeObserver(([entry]) => {
			const newWidth = entry?.contentRect.width;
			if (newWidth !== undefined) {
				if (rafRef.current) {
					cancelAnimationFrame(rafRef.current);
				}

				rafRef.current = requestAnimationFrame(() => {
					const roundedNewWidth = Math.round(newWidth);
					setActualContainerWidth((prev) =>
						prev !== roundedNewWidth ? roundedNewWidth : prev,
					);
				});
			}
		});

		observer.observe(currentElement);
		return () => {
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}
			if (currentElement) {
				observer.unobserve(currentElement);
			}
			observer.disconnect();
		};
	}, []);

	const calculatedSizesString = useMemo(() => {
		if (!isValidDimensions) {
			return '100vw';
		}

		if (!isModal) {
			const gallerySizes = `(
        max-width: ${IMAGE_SIZE_CONFIG.GALLERY_MAX_WIDTH_PX}px
      ) 100vw, ${IMAGE_SIZE_CONFIG.GALLERY_MAX_WIDTH_PX}px`;
			return gallerySizes.replace(/\s+/g, ' ').trim();
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
		const roundedFinalWidth = Math.round(finalCalculatedWidth);

		return `(max-width: 767px) 100vw, ${roundedFinalWidth}px`;
	}, [
		width,
		height,
		isModal,
		actualContainerWidth,
		viewportHeight,
		isValidDimensions,
	]);

	useEffect(() => {
		setImageSizes(calculatedSizesString);
	}, [calculatedSizesString]);

	return { imageSizes, containerRef };
}
