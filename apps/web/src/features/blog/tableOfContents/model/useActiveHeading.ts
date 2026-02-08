'use client';

import { useEffect, useState } from 'react';

const HEADER_OFFSET = '80px';
const BOTTOM_THRESHOLD = '80%';
const ROOT_MARGIN = `-${HEADER_OFFSET} 0px -${BOTTOM_THRESHOLD} 0px`;

export const useActiveHeading = (headingIds: string[]) => {
	const [activeId, setActiveId] = useState<string | null>(null);

	useEffect(() => {
		if (headingIds.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				}
			},
			{ rootMargin: ROOT_MARGIN },
		);

		for (const id of headingIds) {
			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		}

		return () => observer.disconnect();
	}, [headingIds]);

	return activeId;
};
