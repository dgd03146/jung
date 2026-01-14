import { sprinkles } from '@jung/design-system/styles';
import { style } from '@vanilla-extract/css';

const _BLUE = '#0033CC';

export const container = style([
	sprinkles({
		marginX: 'auto',
		width: {
			base: 'tablet',
			tablet: 'tablet',
			laptop: 'laptop',
		},
	}),
	{
		maxWidth: '92%',
		paddingTop: '2rem',
		paddingBottom: '2rem',

		'@media': {
			'(max-width: 768px)': {
				paddingTop: '2rem',
				paddingBottom: '4rem',
			},
		},
	},
]);

export const content = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '1.75rem',
	maxWidth: '640px',
	marginLeft: 'auto',
	marginRight: 'auto',
	textAlign: 'left',
});

export const paragraph = style({
	fontFamily: 'var(--font-poppins), sans-serif',
	fontSize: '1rem',
	lineHeight: 1.9,
	color: '#1a1a1a',
	wordBreak: 'keep-all',

	'@media': {
		'(max-width: 768px)': {
			fontSize: '0.9375rem',
			lineHeight: 1.8,
		},
	},
});
