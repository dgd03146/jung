'use client';

import {
	type RefObject,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
} from 'react';

import { useViewportHeight } from '@/fsd/shared';
import { findNearestImageSize } from '../lib/findNearestImageSize';

const CONFIG = {
	fallbackHeight: 768,
	maxModalWidth: 650,
	maxGalleryWidth: 600,
	heightLimitFactor: 0.75,
	mobileMaxWidth: 767,
	mobilePercent: 90,

	resizeThreshold: 2,
};

interface UseImageSizesProps {
	containerRef: RefObject<HTMLElement>;
	aspectRatio: number;
	isModal?: boolean;
	maxHeightPercent?: number;
}

export function useImageSizes({
	containerRef,
	aspectRatio,
	isModal = false,
	maxHeightPercent = 0.8,
}: UseImageSizesProps): { imageSizes: string } {
	const [containerWidth, setContainerWidth] = useState<number>(0);
	const viewportHeight = useViewportHeight();

	useLayoutEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const initialWidth = Math.round(el.clientWidth);
		if (initialWidth > 0) {
			setContainerWidth(initialWidth);
		}
	}, [containerRef]);

	useEffect(() => {
		const el = containerRef.current;
		if (!el || !el.clientWidth) return;

		const updateContainerWidth = (width: number) => {
			setContainerWidth((prev) =>
				prev === 0 || Math.abs(prev - width) >= CONFIG.resizeThreshold
					? width
					: prev,
			);
		};

		const observer = new ResizeObserver(([entry]) => {
			const newWidth = Math.round(entry?.contentRect.width || 0);
			if (newWidth > 0) {
				updateContainerWidth(newWidth);
			}
		});

		observer.observe(el);
		return () => observer.disconnect();
	}, [containerRef]);

	const imageSizes = useMemo(() => {
		if (aspectRatio <= 0 || containerWidth <= 0 || viewportHeight <= 0) {
			return '1px';
		}

		if (!isModal) {
			const galleryImageMaxHeight = viewportHeight * maxHeightPercent;
			const calculatedWidthFromGalleryHeight =
				galleryImageMaxHeight * aspectRatio;

			const galleryImageWidth = Math.min(
				containerWidth,
				calculatedWidthFromGalleryHeight,
				CONFIG.maxGalleryWidth,
			);
			const snappedGalleryWidth = findNearestImageSize(galleryImageWidth);

			return `(max-width: ${snappedGalleryWidth}px) 100vw, ${snappedGalleryWidth}px`;
		}

		const modalImageMaxHeight = viewportHeight * CONFIG.heightLimitFactor;

		const calculatedWidthFromHeight = modalImageMaxHeight * aspectRatio;

		let targetLayoutWidth = Math.min(
			containerWidth,
			calculatedWidthFromHeight,
			CONFIG.maxModalWidth,
		);

		targetLayoutWidth = Math.max(1, Math.round(targetLayoutWidth));
		const snappedModalWidth = findNearestImageSize(targetLayoutWidth);

		return [
			`(max-width: ${CONFIG.mobileMaxWidth}px) ${CONFIG.mobilePercent}vw`,
			`${snappedModalWidth}px`,
		].join(', ');
	}, [aspectRatio, containerWidth, viewportHeight, isModal, maxHeightPercent]);

	return { imageSizes };
}
