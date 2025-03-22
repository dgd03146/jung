import { breakpoints } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const minWidthResponsive = style({
	'@media': {
		[`(min-width: ${breakpoints.laptop}px)`]: {
			width: '240px',
		},
	},
});

export const sidebar = style({
	width: '100%',
	'@media': {
		[`(min-width: ${breakpoints.laptop}px)`]: {
			width: '240px',
		},
	},
});

export const sidebarContainer = style({
	'@media': {
		[`(min-width: ${breakpoints.laptop}px)`]: {
			top: 80,
			position: 'sticky',
		},
	},
});

export const sidebarSection = style([
	minWidthResponsive,
	{
		borderTopWidth: '1px',
		borderBottomWidth: '1px',
		borderStyle: 'solid',
		borderColor: '#ececec',
	},
]);

export const socialContainer = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
});

export const socialItem = style({
	width: '32px',
	height: '32px',
	borderRadius: '4px',
});

export const logoSkeleton = style({
	width: '60px',
	height: '60px',
	borderRadius: '4px',
});

export const sectionTitle = style({
	width: '80px',
	height: '24px',
	marginBottom: '8px',
});

export const tagContainer = style({
	display: 'flex',
	flexWrap: 'wrap',
	gap: '8px',
});

export const tag = style({
	width: '80px',
	height: '28px',
	borderRadius: '4px',
});

export const postTitle = style({
	width: '100%',
	height: '20px',
	borderRadius: '4px',
	marginTop: '4px',
});

export const backButtonSkeleton = style({
	width: '140px',
	height: '24px',
	borderRadius: '4px',
	marginTop: '32px',
});
