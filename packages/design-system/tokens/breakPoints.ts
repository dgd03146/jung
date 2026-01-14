export const breakpoints = {
	base: '0px',
	mobile: '360px',
	tablet: '768px',
	laptop: '1024px',
} as const;

// Media query helpers for consistent usage across CSS files
export const mediaQueries = {
	mobile: `(max-width: ${breakpoints.mobile})`,
	tablet: `(max-width: ${breakpoints.tablet})`,
	laptop: `(max-width: ${breakpoints.laptop})`,
} as const;
