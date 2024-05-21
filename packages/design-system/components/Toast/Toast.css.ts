import { keyframes, style } from '@vanilla-extract/css';

import { sprinkles } from '../../styles';

const fadeIn = keyframes({
	'0%': { opacity: 0 },
	'100%': { opacity: 1 },
});

export const toast = style([
	sprinkles({
		background: 'black',
	}),
	{
		padding: '13px 24px 13px 24px',
		borderRadius: '100px',

		animationDelay: '100ms',
		animation: `${fadeIn} 200ms cubic-bezier(0.37, 0, 0.63, 1) forwards`,
	},
]);
