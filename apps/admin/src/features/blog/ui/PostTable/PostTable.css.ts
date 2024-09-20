import { sprinkles } from '@jung/design-system/styles';
import { style } from '@vanilla-extract/css';

// Styles
export const tableWrapper = style({
	overflowX: 'auto',
	width: '100%',
});

export const th = sprinkles({
	background: 'primary50',
	borderBottomWidth: 'hairline',
	borderStyle: 'solid',
	borderColor: 'primary100',
	padding: {
		mobile: '2',
		laptop: '3',
	},
});

export const td = sprinkles({
	background: 'white',
	borderBottomWidth: 'hairline',
	borderStyle: 'solid',
	borderColor: 'primary100',
	padding: {
		mobile: '2',
		laptop: '3',
	},
});
