import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const header = recipe({
	base: {
		transition: 'all 0.3s ease',
		backgroundColor: 'white',
		borderBottom: '1px solid #F1F5F9',
	},
	variants: {
		isScrolled: {
			true: {
				boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
			},
		},
	},
});

export const titleWrapper = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
});

export const mainPath = style({
	fontSize: '1.125rem',
	fontWeight: '600',
	color: palette.primary,
	letterSpacing: '-0.01em',
});

export const titleSeparator = style({
	color: '#CBD5E1',
	width: '16px',
	height: '16px',
});

export const subPath = style({
	fontSize: '14px',
	fontWeight: '500',
	color: palette.primary200,
	letterSpacing: '-0.01em',
});

export const pageTitle = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	height: '32px',
	padding: '0 4px',
});

export const breadcrumbSeparator = style({
	color: '#94A3B8',
	fontWeight: '400',
});

export const iconButton = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '44px',
	height: '44px',
	borderRadius: '12px',
	border: '1px solid #F1F5F9',
	backgroundColor: 'white',
	color: '#64748B',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	position: 'relative',

	':hover': {
		backgroundColor: '#F8FAFC',
		borderColor: '#E2E8F0',
		color: '#0142C0',
	},

	':active': {
		backgroundColor: '#F1F5F9',
	},
});

export const notificationBadge = style({
	position: 'absolute',
	top: '-2px',
	right: '-2px',
	minWidth: '20px',
	height: '20px',
	padding: '0 6px',
	borderRadius: '10px',
	backgroundColor: '#0142C0',
	color: 'white',
	fontSize: '12px',
	fontWeight: '600',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	border: '2px solid white',
	boxShadow: '0 2px 4px rgba(1, 66, 192, 0.1)',
});

export const menuButton = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '28px',
	height: '28px',
	padding: '0',
	border: 'none',
	borderRadius: '4px',
	backgroundColor: 'transparent',
	color: '#0142C0',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		backgroundColor: '#f0f2ff',
	},

	':active': {
		backgroundColor: '#e6e9ff',
	},
});
