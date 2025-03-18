'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

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
	const [openIndexes, setOpenIndexes] = useState<Set<number>>(() => {
		const initialSet = new Set<number>();

		if (typeof window !== 'undefined') {
			try {
				const savedState = localStorage.getItem(storageKey);
				if (savedState) {
					const parsedState = JSON.parse(savedState);
					for (const index of parsedState) {
						initialSet.add(index);
					}
				}
			} catch (e) {
				console.error('Failed to load accordion state from localStorage', e);
			}
		}

		if (initialOpenIndex !== undefined && initialOpenIndex >= 0) {
			initialSet.add(initialOpenIndex);
		}

		return initialSet;
	});

	const [animationEnabled, setAnimationEnabled] = useState(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			try {
				localStorage.setItem(
					storageKey,
					JSON.stringify(Array.from(openIndexes)),
				);
			} catch (e) {
				console.error('Failed to save accordion state to localStorage', e);
			}
		}
	}, [openIndexes, storageKey]);

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
		[type],
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
