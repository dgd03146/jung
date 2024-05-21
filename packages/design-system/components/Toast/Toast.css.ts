import { keyframes, style } from '@vanilla-extract/css';

import { sprinkles } from '../../styles';

const fadeIn = keyframes({
	'0%': { opacity: 0 },
	'100%': { opacity: 1 },
});

export const toast = style([
	sprinkles({
		background: 'primary300',

		paddingX: '4',
		paddingY: '3',
		borderRadius: '2xl',
	}),
	{
		animationDelay: '100ms',
		animation: `${fadeIn} 200ms cubic-bezier(0.37, 0, 0.63, 1) forwards`,
	},
]);
