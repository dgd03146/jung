'use client';

import { useStorage } from '@jung/shared/hooks';
import { useCallback, useMemo, useState } from 'react';

const ACCORDION_STATE_KEY = 'accordion-open-state';

interface UseAccordionProps {
	type: 'single' | 'multiple';
	initialOpenIndex?: number;
	storageKey?: string;
}

export const useAccordion = ({
	type,
	initialOpenIndex,
	storageKey = ACCORDION_STATE_KEY,
}: UseAccordionProps) => {
	const getInitialOpenIndexes = useCallback(() => {
		const initialSet = new Set<number>();
		if (initialOpenIndex !== undefined && initialOpenIndex >= 0) {
			initialSet.add(initialOpenIndex);
		}
		return initialSet;
	}, [initialOpenIndex]);

	const [openIndexes, setOpenIndexes] = useStorage<Set<number>>(
		storageKey,
		getInitialOpenIndexes(),
		'sessionStorage',
	);

	const [animationEnabled, setAnimationEnabled] = useState(false);

	const handleToggleIndex = useCallback(
		(index: number) => {
			setOpenIndexes((prev) => {
				const newSet = new Set(prev);
				if (type === 'multiple') {
					if (newSet.has(index)) {
						newSet.delete(index);
					} else {
						newSet.add(index);
					}
				} else if (type === 'single') {
					if (newSet.has(index)) {
						newSet.delete(index);
					} else {
						newSet.clear();
						newSet.add(index);
					}
				}
				return newSet;
			});
		},
		[type, setOpenIndexes],
	);

	const value = useMemo(
		() => ({
			type,
			openIndexes,
			handleToggleIndex,
			animationEnabled,
			setAnimationEnabled,
		}),
		[type, openIndexes, handleToggleIndex, animationEnabled],
	);

	return { value };
};
