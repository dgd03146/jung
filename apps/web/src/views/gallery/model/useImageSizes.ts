'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useViewportHeight } from '@/fsd/shared';
import { findNearestImageSize } from '../lib/findNearestImageSize';

const CONFIG = {
	fallbackWidth: 600,
	fallbackAspectRatio: 4 / 3,
	maxModalWidth: 650,
	maxGalleryWidth: 600,
	heightLimitFactor: 0.75,
	mobileMaxWidth: 767,
	mobilePercent: 90,
	resizeThreshold: 2,
};

interface UseImageSizesProps {
	containerRef: React.RefObject<HTMLElement | null>;
	aspectRatio?: number;
	isModal?: boolean;
	maxHeightPercent?: number;
}

export function useImageSizes({
	containerRef,
	aspectRatio = CONFIG.fallbackAspectRatio,
	isModal = false,
	maxHeightPercent = 0.8,
}: UseImageSizesProps): { imageSizes: string } {
	const [containerWidth, setContainerWidth] = useState(CONFIG.fallbackWidth);
	const viewportHeight = useViewportHeight();
	const observerRef = useRef<ResizeObserver | null>(null);
	const rafRef = useRef<number | null>(null);
	const isFallback =
		containerWidth === CONFIG.fallbackWidth && !containerRef.current;

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		if (observerRef.current) {
			observerRef.current.disconnect();
			observerRef.current = null;
		}
		if (rafRef.current) {
			cancelAnimationFrame(rafRef.current);
		}

		let delayId: NodeJS.Timeout | null = null;

		const observer = new ResizeObserver(([entry]) => {
			const newWidth = Math.round(entry?.contentRect.width || 0);
			if (newWidth > 0) {
				setContainerWidth((prev) => {
					if (
						prev === CONFIG.fallbackWidth ||
						Math.abs(prev - newWidth) >= CONFIG.resizeThreshold
					) {
						return newWidth;
					}
					return prev;
				});
			}
		});

		delayId = setTimeout(() => {
			rafRef.current = requestAnimationFrame(() => {
				if (el && containerRef.current) {
					observer.observe(el);
					observerRef.current = observer;
				}
			});
		}, 20);

		return () => {
			if (delayId) {
				clearTimeout(delayId);
			}
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}
			if (observerRef.current) {
				observerRef.current.disconnect();
				observerRef.current = null;
			} else {
				observer.disconnect();
			}
		};
	}, [containerRef]);

	const imageSizes = useMemo(() => {
		if (!viewportHeight || isFallback) {
			const initialComparableWidth = CONFIG.fallbackWidth;
			if (isModal) {
				return `(max-width: ${CONFIG.mobileMaxWidth}px) ${CONFIG.mobilePercent}vw, ${initialComparableWidth}px`;
			}
			return `(max-width: ${initialComparableWidth}px) 100vw, ${initialComparableWidth}px`;
		}

		const calculateWidthFromHeight = (height: number): number =>
			height * aspectRatio;

		if (isModal) {
			const maxModalHeight = viewportHeight * CONFIG.heightLimitFactor;
			const widthFromMaxHeight = calculateWidthFromHeight(maxModalHeight);
			const modalLayoutWidth = Math.min(
				containerWidth,
				widthFromMaxHeight,
				CONFIG.maxModalWidth,
			);
			const snappedModalWidth = findNearestImageSize(
				Math.round(Math.max(1, modalLayoutWidth)),
			);
			return `(max-width: ${CONFIG.mobileMaxWidth}px) ${CONFIG.mobilePercent}vw, ${snappedModalWidth}px`;
		}

		const maxGalleryImageHeight = viewportHeight * maxHeightPercent;
		const widthFromMaxGalleryHeight = calculateWidthFromHeight(
			maxGalleryImageHeight,
		);
		const galleryLayoutWidth = Math.min(
			containerWidth,
			widthFromMaxGalleryHeight,
			CONFIG.maxGalleryWidth,
		);
		const snappedGalleryWidth = findNearestImageSize(
			Math.round(Math.max(1, galleryLayoutWidth)),
		);
		return `(max-width: ${snappedGalleryWidth}px) 100vw, ${snappedGalleryWidth}px`;
	}, [
		aspectRatio,
		containerWidth,
		viewportHeight,
		isModal,
		maxHeightPercent,
		isFallback,
	]);

	return { imageSizes };
}
