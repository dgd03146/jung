'use client';

import { useEffect, useState } from 'react';

interface UseThrottleOptions {
	delayMs?: number;
	throttleMs?: number;
}

export const useThrottle = (
	condition: boolean,
	{ delayMs = 500, throttleMs = 2000 }: UseThrottleOptions = {},
) => {
	const [isThrottled, setIsThrottled] = useState(false);

	useEffect(() => {
		if (condition) {
			const delayTimer = setTimeout(() => {
				if (condition) {
					setIsThrottled(true);

					const throttleTimer = setTimeout(() => {
						setIsThrottled(false);
					}, throttleMs);

					return () => clearTimeout(throttleTimer);
				}
			}, delayMs);

			return () => clearTimeout(delayTimer);
		}
	}, [condition, delayMs, throttleMs]);

	return isThrottled;
};
