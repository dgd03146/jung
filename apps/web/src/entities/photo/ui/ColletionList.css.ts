import { breakpoints } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const collectionListGrid = style({
	display: 'grid',
	gridTemplateColumns: 'minmax(0px, 1fr)',
	gap: '24px',

	'@media': {
		[`(min-width: ${breakpoints.tablet})`]: {
			gridTemplateColumns: 'repeat(2, minmax(0px, 1fr))',
		},
		[`(min-width: ${breakpoints.laptop})`]: {
			gridTemplateColumns: 'repeat(3, minmax(0px, 1fr))',
		},
	},
});
