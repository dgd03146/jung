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
		// rowGap: '4',
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
		// rowGap: '4',
	}),
]);

export const contentNoAnimation = recipe({
	base: sprinkles({
		display: 'flex',
		flexDirection: 'column',
		overflow: 'hidden',
	}),
	variants: {
		isOpen: {
			true: {
				maxHeight: 'none',
				visibility: 'visible',
			},
			false: {
				maxHeight: '0px',
				visibility: 'hidden',
			},
		},
	},
	defaultVariants: {
		isOpen: false,
	},
});

export const trigger = recipe({
	base: style([
		sprinkles({
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingY: '4',
			paddingX: '4',
			cursor: 'pointer',
			height: 'full',
		}),
		{
			fontSize: '13.5px',
			fontWeight: '600',
			color: '#1a1a1a',
			letterSpacing: '-0.01em',
			':hover': {
				backgroundColor: 'rgba(1, 66, 192, 0.03)',
				color: '#0142C0',
			},
		},
	]),
	variants: {
		active: {
			true: {
				backgroundColor: '#f5f7ff',
				color: '#0142C0',
				fontWeight: '600',
				transform: 'translateX(2px)',

				':before': {
					content: '""',
					position: 'absolute',
					left: '0',
					top: '50%',
					transform: 'translateY(-50%)',
					width: '3px',
					height: '70%',
					backgroundColor: '#0142C0',
					borderRadius: '0 2px 2px 0',
					transition: 'height 0.2s ease',
					opacity: 1,
				},

				':hover': {
					backgroundColor: '#f0f2ff',
					transform: 'translateX(2px)',
				},
			},
		},
	},
	defaultVariants: {
		active: false,
	},
});

export const arrow = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		height: 'full',
		color: 'primary',
	}),
	{
		transition: 'transform 300ms cubic-bezier(0.65, 0, 0.35, 1)',
	},
]);

globalStyle(`${arrow} svg`, {
	verticalAlign: 'middle',
});

export const arrowOpen = style({
	transform: 'rotate(-180deg)',
});

export const item = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',

		justifyContent: 'center',
	}),

	// {
	// 	borderBottom: '1px solid #EFEFEF',
	// },
]);

export const panel = recipe({
	base: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '8px 16px',
		fontSize: '13px',
		marginLeft: '8px',

		textDecoration: 'none',
		transition: 'all 0.15s ease',
		borderRadius: '6px',
		fontWeight: '500',
		position: 'relative',

		letterSpacing: '-0.01em',

		':hover': {
			backgroundColor: '#f0f2ff',
			color: '#0142C0',
			transform: 'translateX(2px)',
		},

		':before': {
			content: '""',
			position: 'absolute',
			left: '0',
			top: '50%',
			transform: 'translateY(-50%)',
			width: '3px',
			height: '0',
			backgroundColor: '#0142C0',
			borderRadius: '0 2px 2px 0',
			transition: 'height 0.2s ease',
			opacity: 0,
		},
	},
	variants: {
		active: {
			true: {
				backgroundColor: '#f5f7ff',
				color: '#0142C0',
				fontWeight: '600',
				transform: 'translateX(2px)',

				':before': {
					height: '70%',
					opacity: 1,
				},

				':hover': {
					backgroundColor: '#f0f2ff',
					transform: 'translateX(2px)',
				},
			},
		},
	},
	defaultVariants: {
		active: false,
	},
});
