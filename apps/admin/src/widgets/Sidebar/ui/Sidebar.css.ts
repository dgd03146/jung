import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const sidebar = recipe({
	base: {
		width: '240px',
		backgroundColor: 'white',
		borderRight: '1px solid #E2E8F0',
		height: '100dvh',
		transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
		position: 'fixed',
		top: '0',
		left: '0',
		overflowY: 'auto',
		overflowX: 'hidden',
		zIndex: 1000,
	},
	variants: {
		isOpen: {
			true: {
				transform: 'translateX(0)',
			},
			false: {
				transform: 'translateX(-240px)',
			},
		},
	},
});

export const nav = style({
	padding: '0 8px',
	display: 'flex',
	flexDirection: 'column',
	// gap: '4px',
});

export const section = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '2px',
	position: 'relative',
});

export const sectionHeader = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '12px 16px',
	cursor: 'pointer',
	borderRadius: '6px',
	transition: 'all 0.2s ease',
	userSelect: 'none',
	border: 'none',
	backgroundColor: 'transparent',
	width: '100%',

	':hover': {
		backgroundColor: '#f0f2ff',
		color: '#0142C0',
	},
});

export const sectionTitle = style({
	fontSize: '13.5px',
	fontWeight: '600',
	color: '#1a1a1a',
	letterSpacing: '-0.01em',
});

export const sectionIcon = style({
	width: '18px',
	height: '18px',
	color: `${palette.primary}90`,
	flexShrink: 0,
	transition: 'all 0.2s ease',
	opacity: 0.9,

	selectors: {
		[`${sectionHeader}:hover &`]: {
			color: palette.primary,
			opacity: 1,
		},
	},
});

export const chevronIcon = recipe({
	base: {
		width: '14px',
		height: '14px',
		color: `${palette.primary}`,
		transition: 'all 0.2s ease',
		opacity: 0.7,

		selectors: {
			[`${sectionHeader}:hover &`]: {
				color: palette.primary,
				opacity: 1,
			},
		},
	},
	variants: {
		isOpen: {
			true: {
				transform: 'rotate(180deg)',
			},
			false: {
				transform: 'rotate(0)',
			},
		},
	},
});

export const sectionContent = recipe({
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: '1px',
		paddingLeft: '8px',
		transition: 'all 0.2s ease',
	},
	variants: {
		isOpen: {
			true: {
				height: 'auto',
				opacity: 1,
				transform: 'translateY(0)',
			},
			false: {
				height: '0',
				opacity: 0,
				transform: 'translateY(-4px)',
				overflow: 'hidden',
			},
		},
	},
});

export const sectionItem = recipe({
	base: {
		display: 'flex',
		alignItems: 'center',
		padding: '9px 16px',
		fontSize: '13px',
		color: '#333333',
		textDecoration: 'none',
		transition: 'all 0.15s ease',
		borderRadius: '6px',
		fontWeight: '500',
		position: 'relative',
		margin: '2px 0',
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
});

export const sectionLabel = style({
	fontSize: '11px',
	fontWeight: '600',
	color: '#94A3B8',
	textTransform: 'uppercase',
	letterSpacing: '0.05em',
	padding: '0 12px',
	marginTop: '16px',
	marginBottom: '6px',
});

export const menuButton = style({
	padding: '8px',
	borderRadius: '4px',
	border: 'none',
	backgroundColor: 'transparent',
	cursor: 'pointer',
	color: '#37352f',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	':hover': {
		backgroundColor: 'rgba(55, 53, 47, 0.08)',
	},
});

export const sectionDivider = style({
	height: '1px',
	margin: '8px 16px',
	background: `${palette.primary}10`,
});

export const dashboardItem = recipe({
	base: {
		display: 'flex',
		alignItems: 'center',
		marginTop: '8px',
		gap: '12px',
		padding: '16px',
		width: '100%',
		height: '56px',
		borderRadius: '12px',
		marginBottom: '12px',
		transition: 'all 0.2s ease',
		fontSize: '15px',
		fontWeight: 600,
		background: '#f8f9fc',
		border: '1px solid #edf0f7',

		':hover': {
			background: '#f0f4ff',
			borderColor: '#e0e7ff',
			transform: 'translateY(-1px)',
		},
	},
	variants: {
		active: {
			true: {
				background: '#fff',
				borderColor: '#e5e7eb',
				boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
				color: palette.primary,

				':hover': {
					background: '#f0f4ff',
					borderColor: '#e0e7ff',
					transform: 'translateY(-1px)',
				},
			},
		},
	},
});

export const dashboardIcon = style({
	width: '20px',
	height: '20px',
	color: palette.primary,
});
