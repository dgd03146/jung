import { breakpoints } from './breakPoints';

export const space = {
	px: '1px',
	'0': '0px',
	'0.5': '0.125rem', // 2px
	'1': '0.25rem', // 4px
	'1.5': '0.375rem', // 6px
	'2': '0.5rem', // 8px
	'2.5': '0.625rem', // 10px
	'3': '0.75rem', // 12px
	'4': '1rem', // 16px
	'5': '1.25rem', // 20px
	'6': '1.5rem', // 24px
	'8': '2rem', // 32px
	'10': '2.5rem', // 40px
	'12': '3rem', // 48px
	'16': '4rem', // 64px
	'20': '5rem', // 80px
	'24': '6rem', // 96px
	'32': '8rem', // 128px
	'40': '10rem', // 160px
	'48': '12rem', // 192px
	'64': '16rem', // 256px
	'80': '20rem', // 320px
	'96': '24rem', // 384px

	auto: 'auto',
	full: '100%',
	fit: 'fit-content',
	max: 'max-content',
	min: 'min-content',

	screenVh: '100vh',
	screenVw: '100vw',
	screenDvh: '100dvh',
	screenDvw: '100dvw',
	'50vw': '50vw',
	'50vh': '50vh',
	'90vw': '90vw',
};

export const extendedSpace = {
	'1/4': '25%',
	'1/3': '33.333333%',
	'1/2': '50%',
	'2/3': '66.666667%',
	'3/4': '75%',
	...breakpoints,
};
