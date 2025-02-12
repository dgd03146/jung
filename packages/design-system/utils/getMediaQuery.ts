import { breakpoints } from '../tokens';

export const getMediaQuery = (breakpoint: keyof typeof breakpoints) => {
	if (!breakpoints[breakpoint]) {
		throw new Error(`Invalid breakpoint: ${breakpoint}`);
	}

	return `screen and (min-width: ${breakpoints[breakpoint]})`;
};
