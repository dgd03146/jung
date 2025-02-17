import { sprinkles } from '@jung/design-system/styles';
import { style } from '@vanilla-extract/css';

export const title = style({
	fontFamily: 'var(--font-bebas)',
	letterSpacing: '0.02em',
});

export const socialLoginWrapper = style([
	sprinkles({
		width: 'full',
		display: 'flex',
		justifyContent: 'center',
	}),
	{
		margin: '0 auto',
	},
]);

export const avatarWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	}),
	{
		width: '40px',
		height: '40px',
		borderRadius: '50%',
		padding: '3px',
	},
]);

export const avatar = style({
	width: '100%',
	height: '100%',
	borderRadius: '50%',
	objectFit: 'cover',
	border: '2px solid white',
});
