import { ALBUM_OPTIONS, PRIORITY_IMAGE } from '../config/constants';

export const getPriorityImageCount = (width: number): number => {
	if (width < ALBUM_OPTIONS.BREAKPOINTS.MOBILE) {
		return PRIORITY_IMAGE.MOBILE;
	}
	if (width < ALBUM_OPTIONS.BREAKPOINTS.LAPTOP) {
		return PRIORITY_IMAGE.LAPTOP;
	}
	return PRIORITY_IMAGE.DESKTOP;
};
