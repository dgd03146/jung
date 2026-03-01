import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export { nav } from './shared.css';

const tabBase = style({
	fontFamily: 'var(--font-bebas)',
	fontSize: '0.75rem',
	letterSpacing: '0.06em',
	textDecoration: 'none',
	textTransform: 'uppercase',
	padding: '6px 14px',
	borderRadius: '100px',
	transition: 'background 0.2s, color 0.2s, border-color 0.2s',
	whiteSpace: 'nowrap',
});

export const tab = style([
	tabBase,
	{
		color: palette.gray300,
		border: `1.5px solid ${palette.gray200}`,
		selectors: {
			'&:hover': {
				color: palette.primary200,
				borderColor: palette.primary200,
			},
		},
	},
]);

export const tabActive = style([
	tabBase,
	{
		color: palette.white,
		backgroundColor: palette.primary,
		border: '1.5px solid transparent',
	},
]);
