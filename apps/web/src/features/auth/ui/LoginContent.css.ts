import { sprinkles } from '@jung/design-system/styles';
import { breakpoints } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const container = style([
	sprinkles({
		width: 'full',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}),
	{
		minHeight: 'calc(100dvh - 144px)',
	},
]);

export const card = style([
	sprinkles({
		width: 'full',
		background: 'white',
		borderRadius: 'lg',
		boxShadow: 'primary',
		padding: '10',
	}),
	{
		maxWidth: '400px',

		'@media': {
			[`screen and (min-width: ${breakpoints.tablet}px)`]: {
				padding: '40px',
			},
		},
	},
]);

export const subtitle = style([
	sprinkles({
		textAlign: 'center',
	}),
	{
		maxWidth: '280px',
		margin: '0 auto',
		'@media': {
			[`screen and (min-width: ${breakpoints.tablet}px)`]: {
				maxWidth: '320px',
			},
		},
	},
]);

export const socialLoginWrapper = style([
	sprinkles({
		width: 'full',
		display: 'flex',
		justifyContent: 'center',
	}),
	{
		maxWidth: '280px',
		margin: '0 auto',
		'@media': {
			[`screen and (min-width: ${breakpoints.tablet}px)`]: {
				maxWidth: '320px',
			},
		},
	},
]);

export const footer = style([
	sprinkles({
		textAlign: 'center',
	}),
	{
		maxWidth: '280px',
		margin: '0 auto',
		'@media': {
			[`screen and (min-width: ${breakpoints.tablet}px)`]: {
				maxWidth: '320px',
			},
		},
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
		width: '96px',
		height: '96px',
		borderRadius: '50%',
		padding: '3px',
		background:
			'linear-gradient(45deg, var(--color-primary-100), var(--color-primary-300))',
		marginBottom: '8px',
	},
]);

export const avatar = style({
	width: '100%',
	height: '100%',
	borderRadius: '50%',
	objectFit: 'cover',
	border: '2px solid white',
});
