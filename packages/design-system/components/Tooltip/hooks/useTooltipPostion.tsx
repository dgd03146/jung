import { useCallback, useLayoutEffect, useState } from 'react';
import {
	calculateArrowX,
	calculateTranslateX,
	calculateTranslateY,
} from '../utils/calculatePosition';

type TooltipPositionProps = {
	isVisible: boolean;
	placement: 'left' | 'center' | 'right';
	viewportSize: {
		width: number;
		height: number;
	};
	refs: {
		wrapperRef: React.MutableRefObject<HTMLDivElement | null>;
		tooltipRef: React.MutableRefObject<HTMLDivElement | null>;
		arrowRef: React.MutableRefObject<HTMLDivElement | null>;
	};
};

export const useTooltipPosition = ({
	isVisible,
	placement,
	viewportSize,
	refs: { wrapperRef, tooltipRef, arrowRef },
}: TooltipPositionProps) => {
	const [isInViewport, setIsInViewport] = useState(false);

	const applyTransforms = useCallback(
		(
			translateX: number,
			translateY: number,
			arrowX: number,
			arrowY: number,
		) => {
			const currentTooltipTransform = tooltipRef.current!.style.transform;
			const newTooltipTransform = `translate3d(${translateX}px, ${translateY}px, 0)`;
			if (currentTooltipTransform !== newTooltipTransform) {
				tooltipRef.current!.style.transform = newTooltipTransform;
			}

			const currentArrowTransform = arrowRef.current!.style.transform;
			const newArrowTransform = `translate3d(${arrowX}px, ${arrowY}px, 0)`;
			if (currentArrowTransform !== newArrowTransform) {
				arrowRef.current!.style.transform = newArrowTransform;
			}
		},
		[tooltipRef, arrowRef],
	);

	useLayoutEffect(() => {
		if (!(wrapperRef.current && tooltipRef.current && arrowRef.current)) {
			return;
		}

		if (!isVisible) {
			tooltipRef.current.style.transform = '';
			arrowRef.current.style.transform = '';
			return;
		}

		const wrapperRect = wrapperRef.current.getBoundingClientRect();
		const tooltipRect = tooltipRef.current.getBoundingClientRect();
		const arrowRect = arrowRef.current.getBoundingClientRect();

		const translateY = calculateTranslateY(
			wrapperRect,
			tooltipRect,
			viewportSize.height,
		);
		const translateX = calculateTranslateX(wrapperRect, tooltipRect, placement);

		const arrowX = calculateArrowX(
			translateX,
			tooltipRect,
			arrowRect,
			placement,
		);

		const isArrowDown =
			wrapperRect.bottom + tooltipRect.height >= viewportSize.height;
		setIsInViewport(isArrowDown);

		const arrowY = isArrowDown
			? translateY + tooltipRect.height - 10
			: translateY - 14;

		if (translateX > 0 || placement === 'left') {
			applyTransforms(translateX, translateY, arrowX, arrowY);
		} else {
			const transformMatrix = window.getComputedStyle(
				tooltipRef.current,
			).transform;
			let currentTranslateX = 0;

			if (transformMatrix && transformMatrix !== 'none') {
				const matrixValues = transformMatrix
					.split('(')[1]
					?.split(')')[0]
					?.split(',');
				if (matrixValues?.[4]) {
					currentTranslateX = Number.parseFloat(matrixValues[4]);
				}
			}

			// 기존의 currentTranslateX와 arrowX 값을 구하여 적용
			const currentArrowX = calculateArrowX(
				currentTranslateX,
				tooltipRect,
				arrowRect,
				placement,
			);

			applyTransforms(currentTranslateX, translateY, currentArrowX, arrowY);
		}
	}, [isVisible, placement, viewportSize.height, viewportSize.width]);

	return { isInViewport };
};
