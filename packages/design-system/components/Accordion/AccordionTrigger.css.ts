import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../styles/sprinkles.css';

export const trigger = sprinkles({
	display: 'flex',
	justifyContent: 'space-between',
	cursor: 'pointer',
});

export const arrow = style([
	sprinkles({
		height: 'fit',
		color: 'primary',
	}),
	{
		transition: 'transform 300ms cubic-bezier(0.65, 0, 0.35, 1)',
	},
]);

export const arrowOpen = style({
	transform: 'rotate(-180deg)',
});
