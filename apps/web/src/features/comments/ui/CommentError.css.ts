import { style } from '@vanilla-extract/css';

const primaryColor = '#3B82F6';
const errorLightColor = '#FEE2E2';
const errorMainColor = '#DC2626';
const errorDarkColor = '#B91C1C';

export const errorContainer = style({
	padding: '16px',
	backgroundColor: errorLightColor,
	borderRadius: '12px',
	border: `1px solid ${errorMainColor}`,
	marginBottom: '16px',
	transition: 'all 0.2s ease',
	':hover': {
		boxShadow: '0 2px 8px rgba(220, 38, 38, 0.1)',
	},
});

export const errorIcon = style({
	marginRight: '8px',
	color: errorMainColor,
});

export const errorText = style({
	color: errorDarkColor,
	fontSize: '14px',
	fontWeight: 500,
	lineHeight: 1.5,
});

export const errorContent = style({
	display: 'flex',
	alignItems: 'center',
});
