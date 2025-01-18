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
	'3.5': '0.875rem', // 14px
	'4': '1rem', // 16px
	'5': '1.25rem', // 20px
	'6': '1.5rem', // 24px
	'7': '1.75rem', // 28px
	'8': '2rem', // 32px
	'9': '2.25rem', // 36px
	'10': '2.5rem', // 40px
	'11': '2.75rem', // 44px
	'12': '3rem', // 48px
	'14': '3.5rem', // 56px
	'16': '4rem', // 64px
	'18': '4.5rem',
	'20': '5rem', // 80px
	'24': '6rem', // 96px
	'25': '6.25rem', // 100px
	'26': '6.5rem', // 104px
	'28': '7rem', // 112px
	'32': '8rem', // 128px
	'36': '9rem', // 144px
	'40': '10rem', // 160px
	'44': '11rem', // 176px
	'45': '11.25rem',
	'46': '11.5rem',

	'48': '12rem', // 192px
	'50': '12.5rem',
	'52': '13rem', // 208px
	'56': '14rem', // 224px
	'60': '15rem', // 240px

	'64': '16rem', // 256px
	'72': '18rem', // 288px
	'80': '20rem', // 320px
	'96': '24rem', // 384px
	auto: 'auto',
	full: '100%',
	fit: 'fit-content',
	max: 'max-content',
	min: 'min-content',
	screenDvh: '100dvh',
	screenDvw: '100dvw',
	screenVh: '100vh',
	screenVw: '100vw',
	'10vw': '10vw',
	'20vw': '20vw',
	'30vw': '30vw',
	'40vw': '40vw',
	'50vw': '50vw',
	'60vw': '60vw',
	'70vw': '70vw',
	'80vw': '80vw',
	'85vw': '85vw',
	'90vw': '90vw',
	'95vw': '95vw',

	'10vh': '10vh',
	'20vh': '20vh',
	'30vh': '30vh',
	'40vh': '40vh',
	'50vh': '50vh',
	'60vh': '60vh',
	'70vh': '70vh',
	'80vh': '80vh',
	'85vh': '85vh',
	'90vh': '90vh',
	'95vh': '95vh',
};

export const extendedSpace = {
	'1/5': '20%',
	'1/4': '25%',
	'1/3': '33.333333%',
	'2/5': '40%',
	half: '50%',
	'3/5': '60%',
	'2/3': '66.666667%',
	'3/4': '75%',
	'4/5': '80%',
	'11/12': '92%',
	...breakpoints,
};
