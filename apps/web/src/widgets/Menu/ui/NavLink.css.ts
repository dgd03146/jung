import { sprinkles } from '@jung/design-system/styles';

export const mainNav = sprinkles({
	flexDirection: 'column',

	rowGap: {
		mobile: '4',
		tablet: '12',
	},
});

export const subNav = sprinkles({
	width: {
		mobile: 'full',
		tablet: 'auto',
	},
	flexDirection: 'column',
	alignItems: 'flex-start',
	rowGap: {
		mobile: '4',
		tablet: '8',
	},
	columnGap: '8',
});
