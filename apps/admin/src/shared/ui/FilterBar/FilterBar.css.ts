import { style } from '@vanilla-extract/css';

export const filterBar = style({
	display: 'flex',
	alignItems: 'center',
	gap: '12px',
	background: 'white',
	borderRadius: '12px',
	padding: '16px',
	marginBottom: '16px',
	flexWrap: 'wrap',
});

export const filterGroup = style({
	display: 'flex',
	alignItems: 'center',
	gap: '12px',
	flex: 1,
	flexWrap: 'wrap',
});

export const select = style({
	padding: '8px 12px',
	borderRadius: '8px',
	border: '1px solid rgba(55, 53, 47, 0.16)',
	background: 'white',
	fontSize: '14px',
	color: 'rgba(55, 53, 47, 0.65)',
	cursor: 'pointer',
	outline: 'none',
	minWidth: '120px',
	transition: 'border-color 0.2s',
	':hover': {
		borderColor: 'rgba(55, 53, 47, 0.3)',
	},
	':focus': {
		borderColor: 'rgba(35, 131, 226, 0.57)',
	},
});

export const clearButton = style({
	padding: '6px 12px',
	borderRadius: '6px',
	border: 'none',
	background: 'rgba(55, 53, 47, 0.08)',
	fontSize: '13px',
	color: 'rgba(55, 53, 47, 0.65)',
	cursor: 'pointer',
	whiteSpace: 'nowrap',
	transition: 'background 0.2s',
	':hover': {
		background: 'rgba(55, 53, 47, 0.16)',
	},
});
