import { style } from '@vanilla-extract/css';

export const container = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '48px 24px',
	gap: '16px',
	borderRadius: '12px',
	border: '1px dashed rgba(0, 0, 0, 0.12)',
	backgroundColor: 'rgba(0, 0, 0, 0.02)',
});

export const icon = style({
	color: 'rgba(0, 0, 0, 0.25)',
	marginBottom: '4px',
});

export const title = style({
	fontSize: '16px',
	fontWeight: 600,
	color: 'rgba(0, 0, 0, 0.65)',
	margin: 0,
});

export const description = style({
	fontSize: '14px',
	color: 'rgba(0, 0, 0, 0.45)',
	margin: 0,
});
