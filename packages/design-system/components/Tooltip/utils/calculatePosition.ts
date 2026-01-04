const margin = 8;

export const calculateTranslateX = (
	wrapperRect: DOMRect,
	tooltipRect: DOMRect,
	// viewportWidth: number,
	position?: 'left' | 'center' | 'right',
) => {
	let translateX: number;

	switch (position) {
		case 'left':
			translateX = wrapperRect.left - tooltipRect.left;

			break;
		case 'right':
			translateX = wrapperRect.right - tooltipRect.right;

			break;
		case 'center':
			translateX = (wrapperRect.width - tooltipRect.width) / 2;
			break;
		default:
			// Handle the default case if needed
			translateX = (wrapperRect.width - tooltipRect.width) / 2;
			break;
	}

	return translateX;
};

export const calculateArrowX = (
	translateX: number,
	tooltipRect: DOMRect,
	arrowRect: DOMRect,
	position?: 'left' | 'center' | 'right',
): number => {
	let arrowX: number;

	switch (position) {
		case 'center':
			arrowX = translateX + tooltipRect.width / 2 - arrowRect.width / 2;
			break;
		case 'left':
			arrowX = translateX + arrowRect.width / 2;
			break;
		case 'right':
			arrowX =
				translateX + tooltipRect.width - arrowRect.width - arrowRect.width / 4;

			break;
		default:
			// Handle default case if needed, for example, default to 'center' behavior
			arrowX = translateX + tooltipRect.width / 2 - arrowRect.width / 2;
			break;
	}

	return arrowX;
};

export const calculateTranslateY = (
	wrapperRect: DOMRect,
	tooltipRect: DOMRect,
	viewportHeight: number,
): number => {
	const isFitBelow = wrapperRect.bottom + tooltipRect.height < viewportHeight;

	return isFitBelow
		? margin
		: -wrapperRect.height - tooltipRect.height - margin;
};
