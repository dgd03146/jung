import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const section = recipe({
	base: {
		display: 'flex',
		height: 'calc(100dvh - 268px)' /* header(60) + nav(48) + margins(160) */,
		position: 'relative',
		'@media': {
			'(max-width: 767px)': {
				flexDirection: 'column',
				height: 'auto',
			},
		},
	},
	variants: {
		reverse: {
			true: {
				flexDirection: 'row-reverse',
				'@media': {
					'(max-width: 767px)': {
						flexDirection: 'column',
					},
				},
			},
			false: {},
		},
	},
	defaultVariants: {
		reverse: false,
	},
});

export const imageHalf = style({
	width: '50%',
	height: '100%',
	position: 'relative',
	overflow: 'hidden',
	'@media': {
		'(max-width: 767px)': {
			width: '100%',
			height: '60vh',
		},
	},
});

export const image = style({
	objectFit: 'cover',
	transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
	selectors: {
		[`${imageHalf}:hover &`]: {
			transform: 'scale(1.03)',
		},
	},
});

export const contentHalf = style({
	width: '50%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	padding: '64px',
	backgroundColor: palette.gray50,
	'@media': {
		'(max-width: 767px)': {
			width: '100%',
			padding: '32px 24px',
		},
	},
});

export const numbering = style({
	fontFamily: 'var(--font-bebas)',
	fontSize: '14px',
	letterSpacing: '0.15em',
	color: palette.primary300,
	marginBottom: '24px',
});

export const title = style({
	fontFamily: 'var(--font-nanum-myeongjo)',
	fontSize: '28px',
	lineHeight: 1.4,
	color: palette.gray900,
	marginBottom: '16px',
	'@media': {
		'(max-width: 767px)': {
			fontSize: '22px',
		},
	},
});

export const description = style({
	fontFamily: 'var(--font-poppins)',
	fontSize: '14px',
	lineHeight: 1.7,
	color: palette.primary300,
	marginBottom: '24px',
	maxWidth: '420px',
});

export const date = style({
	fontFamily: 'var(--font-poppins)',
	fontSize: '12px',
	letterSpacing: '0.05em',
	color: palette.primary200,
	marginBottom: '32px',
});

export const tagsWrapper = style({
	display: 'flex',
	flexWrap: 'wrap',
	gap: '8px',
	marginBottom: '32px',
});

export const tag = style({
	fontFamily: 'var(--font-poppins)',
	fontSize: '11px',
	letterSpacing: '0.05em',
	color: palette.primary300,
	padding: '4px 12px',
	border: `1px solid ${palette.gray200}`,
	borderRadius: '20px',
	textTransform: 'uppercase',
});

export const viewLink = style({
	fontFamily: 'var(--font-poppins)',
	fontSize: '13px',
	letterSpacing: '0.1em',
	textTransform: 'uppercase',
	color: palette.gray900,
	textDecoration: 'none',
	display: 'inline-flex',
	alignItems: 'center',
	gap: '8px',
	position: 'relative',
	paddingBottom: '2px',
	'::after': {
		content: '""',
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '0%',
		height: '1px',
		backgroundColor: palette.gray900,
		transition: 'width 0.3s ease',
	},
	selectors: {
		'&:hover::after': {
			width: '100%',
		},
	},
});
