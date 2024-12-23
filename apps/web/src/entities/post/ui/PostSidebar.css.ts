import { palette } from '@jung/design-system/tokens';
import { globalStyle, style } from '@vanilla-extract/css';

export const externalLink = style({
	display: 'flex',
	alignItems: 'center',
	gap: '6px',
	padding: '8px',
	backgroundColor: 'rgb(1, 66, 192, 0.05)',
	borderRadius: '4px',

	color: 'rgb(1, 66, 192, 0.8)',

	transition: 'all 0.2s ease',

	':hover': {
		borderColor: palette.primary,

		color: palette.primary,
	},
});

export const imgContainer = style({
	flex: '1',
	height: '100px',
});

globalStyle(`${imgContainer} img`, {
	maxInlineSize: '100%',
	blockSize: 'auto',
	objectFit: 'cover',
	borderRadius: '8px',
	display: 'block',
});

export const textContainer = style({});

globalStyle(`${textContainer} p`, {
	maxWidth: '100%',
	display: '-webkit-box',
	WebkitLineClamp: 1,
	WebkitBoxOrient: 'vertical',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
});

export const linkText = style({
	display: 'flex',

	alignItems: 'center',
	gap: '8px',
	textDecoration: 'none',
	fontWeight: '600',
	fontSize: '18px',
	fontFamily: 'var(--font-bebas)',
	color: palette.primary,

	letterSpacing: '0.02em',
	':hover': {
		color: palette.primary200,
		transition: 'all 0.2s ease',
	},
});

export const linkTextIcon = style({
	display: 'flex',
	alignItems: 'center',

	fontSize: '18px',
});

export const adjacentPostTitle = style({
	display: '-webkit-box',
	WebkitLineClamp: 2,
	WebkitBoxOrient: 'vertical',
	overflow: 'hidden',
	color: '#111',
	fontWeight: '500',
	fontSize: '14px',

	textOverflow: 'ellipsis',

	':hover': {
		color: palette.primary200,
		transition: 'all 0.2s ease',
	},
});

export const sidebarHeader = style({
	fontWeight: '600',
	fontSize: '18px',
	fontFamily: 'var(--font-bebas)',
	color: palette.primary,
	marginBottom: '8px',
	letterSpacing: '0.02em',
});

export const tag = style({
	fontSize: '12px',
	fontWeight: '400',
	color: 'rgb(1, 66, 192)', // primary 컬러
	textDecoration: 'none',
	transition: 'all 0.2s ease',
	padding: '6px 12px',
	borderRadius: '6px',
	backgroundColor: 'rgba(1, 66, 192, 0.04)',
	display: 'inline-flex',
	alignItems: 'center',

	':hover': {
		backgroundColor: 'rgba(1, 66, 192, 0.08)',
	},
	':before': {
		content: '#',
		marginRight: '4px',
		opacity: 0.6,
	},
});
