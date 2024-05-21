import { style } from '@vanilla-extract/css';

export const container = style({
	position: 'fixed',
	bottom: '20%',
	left: '50%',
	transform: 'translateX(-50%)',
	zIndex: '1000',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	rowGap: '10px',
});
