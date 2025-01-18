export const fontFamily = {
	notoSans: 'var(--font-noto-sans-kor)',
	pretendard: 'var(--font-pretendard)',
	nanumMyeongjo: 'var(--font-nanumMyeongjo)',
	inter: 'var(--font-inter)',
	rubik: 'var(--font-rubik)',
	dm: 'var(--font-dm-sans)',
	poppins: 'var(--font-poppins)',
	body: '-apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", HelveticaNeue, Helvetica, Arial, sans-serif',
	code: 'ml, "Roboto Mono", Menlo, monospace',
	playfair: 'var(--font-playfair)',
	bebas: 'var(--font-bebas)',
};

export const fontSizes = {
	mini: '0.5rem', // 8px
	xxxs: '0.625rem', // 10px
	xxs: '0.75rem', // 12px
	xs: '0.8125rem', // 13px
	sm: '0.875rem', // 14px

	md: '0.9375rem', // 15px
	base: '1rem', // 16px

	lg: '1.125rem', // 18px
	xl: '1.25rem', // 20px
	'2xl': '1.5rem', // 24px
	'3xl': '2rem', // 32px

	'4xl': '2.25rem', // 36px
	'5xl': '3rem', // 48px
	'6xl': '3.75rem', // 60px
	'7xl': '4.5rem', // 72px

	'8xl': '6rem', // 96px
	'9xl': '8rem', // 128px
	'10xl': '11rem', // 176px
	'11xl': '12rem', // 192px
} as const;

export const lineHeights = {
	none: '1',
	tight: '1.25',
	snug: '1.375',
	normal: '1.5',
	relaxed: '1.625',
	loose: '2',
	big: '11.5rem', // hero font

	'2': '0.625rem', // 10px
	'3': '0.75rem', // 12px
	'4': '1rem', // 16px
	'5': '1.25rem', // 20px
	'5.5': '1.375rem', // 22px
	'6': '1.5rem', // 24px
	'6.5': '1.625rem', // 26px
	'7': '1.75rem', // 28px
	'8': '2rem', // 32px
	'9': '2.25rem', // 36px
	'10': '2.5rem', // 40px
	'12': '3rem', // 48px
	'14': '3.5rem', // 56px
	'15': '4rem',
	'16': '5rem',
	'17': '6rem',
	'18': '7rem',
	'19': '8rem',
	'20': '9rem',
	hero: '11.5rem',
};

export const fontWeights = {
	hairline: '100',
	thin: '200',
	light: '300',
	normal: '400',
	medium: '500',
	semibold: '600',
	bold: '700',
	extrabold: '800',
	black: '900',
};

export const letterSpacings = {
	tighter: '-0.05em',
	tight: '-0.025em',
	normal: '0',
	wide: '0.025em',
	wider: '0.05em',
	widest: '0.1em',
};
