import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../styles';

export const item = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		paddingY: '6',
		paddingX: '4',
	}),
	{
		borderBottom: '1px solid #EFEFEF',
	},
]);
