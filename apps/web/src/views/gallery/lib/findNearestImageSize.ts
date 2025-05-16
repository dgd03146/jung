import { SHARED_IMAGE_SIZES } from '@/fsd/shared';

export function findNearestImageSize(
	target: number,
	candidates = SHARED_IMAGE_SIZES,
) {
	if (candidates.length === 0) return target;
	return candidates.reduce((prev, curr) =>
		Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev,
	);
}
