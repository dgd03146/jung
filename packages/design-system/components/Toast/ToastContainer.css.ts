import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../styles/sprinkles.css';

export const container = style([
	sprinkles({
		position: 'fixed',

		zIndex: '100',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	}),
	{
		transform: 'translateX(-50%)',
		gap: '10px',
		maxWidth: '90%',
		width: 'auto',
		maxHeight: '80vh',

		padding: '20px',
		bottom: '20%',
		left: '50%',
	},
]);
