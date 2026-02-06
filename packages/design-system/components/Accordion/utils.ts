export const isAccordionItemOpen = (
	index: number | undefined,
	openIndexes: unknown,
): boolean => {
	const isValidIndex = typeof index === 'number';
	const isValidSet = openIndexes instanceof Set;

	return isValidIndex && isValidSet && openIndexes.has(index);
};
