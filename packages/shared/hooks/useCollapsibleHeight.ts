'use client';

import { type RefObject, useEffect, useState } from 'react';

export const useCollapsibleHeight = <T extends HTMLElement>(
	ref: RefObject<T | null>,
	isExpanded: boolean,
) => {
	const [contentHeight, setContentHeight] = useState(0);

	useEffect(() => {
		if (ref.current) {
			setContentHeight(isExpanded ? ref.current.scrollHeight : 0);
		}
	}, [ref, isExpanded]);

	return { contentHeight };
};
