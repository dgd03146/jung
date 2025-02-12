'use client';

import { useCallback, useMemo, useState } from 'react';

export const useAccordion = (type: 'single' | 'multiple') => {
	const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

	const handleToggleIndex = useCallback(
		(index: number) => {
			const newSet = new Set(openIndexes);
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

			setOpenIndexes(newSet);
		},
		[openIndexes, type],
	);

	const value = useMemo(
		() => ({ type, openIndexes, handleToggleIndex }),
		[type, openIndexes, handleToggleIndex],
	);

	return { value };
};
