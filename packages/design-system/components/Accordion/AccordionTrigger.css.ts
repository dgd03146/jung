import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../styles';

export const trigger = sprinkles({
	display: 'flex',
	justifyContent: 'space-between',
	cursor: 'pointer',
});

export const arrow = style([
	sprinkles({
		height: 'fit',
		color: 'gray400',
	}),
	{
		transition: 'cubic-bezier(0.65, 0, 0.35, 1) 100ms',
		transitionDelay: '100ms',
	},
]);
