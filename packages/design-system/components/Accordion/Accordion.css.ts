import { createVar, globalStyle, keyframes, style } from '@vanilla-extract/css';

import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';

export const contentHeightVar = createVar();

export const accordionDown = keyframes({
	from: { maxHeight: '0px' },
	to: { maxHeight: contentHeightVar },
});

export const accordionUp = keyframes({
	from: { maxHeight: contentHeightVar },
	to: { maxHeight: '0px' },
});

export const content = recipe({
	base: sprinkles({
		display: 'flex',
		flexDirection: 'column',
		rowGap: '4',
		overflow: 'hidden',
	}),
	variants: {
		isOpen: {
			true: {
				animation: `${accordionDown} 0.3s cubic-bezier(0.37, 0, 0.63, 1)  forwards`,
			},
			false: {
				animation: `${accordionUp} 0.3s cubic-bezier(0.37, 0, 0.63, 1) forwards`,
			},
		},
	},
	defaultVariants: {
		isOpen: false,
	},
});

export const contentChild = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		rowGap: '4',
	}),
]);

globalStyle(`${contentChild}:first-child`, {
	paddingTop: '16px',
});

globalStyle(`${contentChild}:not(:last-child)`, {
	paddingBottom: '16px',
	borderBottom: '0.5px solid #EFEFEF',
});

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
