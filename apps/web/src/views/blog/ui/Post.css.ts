import { sprinkles } from '@jung/design-system/styles';
import { globalStyle, keyframes, style } from '@vanilla-extract/css';

const shimmer = keyframes({
	'0%': { transform: 'skewX(-25deg) translateX(-100%)' },
	'100%': { transform: 'skewX(-25deg) translateX(100%)' },
});

export const imgContainer = style({
	height: '250px',
	borderRadius: '2xl',
	overflow: 'hidden',
	position: 'relative',
	cursor: 'pointer',
	transition: 'all 0.5s ease',

	'::before': {
		content: '""',
		position: 'absolute',
		top: '0',
		left: '0',
		right: '0',
		bottom: '0',
		background:
			'linear-gradient(45deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%)',
		opacity: 0,
		transition: 'opacity 0.5s ease',
	},

	'::after': {
		content: '""',
		position: 'absolute',
		top: '0',
		left: '0',
		right: '0',
		bottom: '0',
		background:
			'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
		transform: 'skewX(-25deg) translateX(-100%)',
		opacity: 0,
		transition: 'opacity 0.5s ease',
	},

	selectors: {
		'&:hover': {
			transform: 'scale(1.03)',
			boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
		},
		'&:hover::before': {
			opacity: 1,
		},
		'&:hover::after': {
			opacity: 1,
			animation: `${shimmer} 1s ease-in-out`,
		},
	},
});

export const imgStyle = style({
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	transition: 'transform 0.5s ease',

	selectors: {
		[`${imgContainer}:hover &`]: {
			transform: 'scale(1.05)',
		},
	},
});

export const link = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		columnGap: '1',
		color: {
			base: 'primary',
			hover: 'primary200',
		},
	}),
	{
		textDecoration: 'none',
		transition: 'all 0.3s ease',
		position: 'relative',
		paddingRight: '1rem',

		':hover': {
			transform: 'translateX(5px)',
		},

		'::after': {
			content: '""',
			position: 'absolute',
			bottom: '-2px',
			left: '0',
			width: '0',
			height: '2px',
			backgroundColor: 'var(--color-primary200)',
			transition: 'width 0.3s ease',
		},

		selectors: {
			'&:hover::after': {
				width: '100%',
			},
		},
	},
]);

export const linkText = style({
	transition: 'transform 0.3s ease',

	selectors: {
		[`${link}:hover &`]: {
			transform: 'translateX(-3px)',
		},
	},
});

export const linkIcon = style({
	transition: 'transform 0.3s ease',
	position: 'absolute',
	right: '0',

	selectors: {
		[`${link}:hover &`]: {
			transform: 'translateX(2px)',
		},
	},
});

globalStyle(`${imgContainer} img`, {
	maxInlineSize: '100%',
	blockSize: 'auto',
	objectFit: 'cover',
	borderRadius: '16px',
	display: 'block', // Ensure the image is displayed as a block-level element
});

export const textContainer = style({});

globalStyle(`${textContainer} p`, {
	display: '-webkit-box',
	WebkitLineClamp: 2,
	WebkitBoxOrient: 'vertical',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
});
