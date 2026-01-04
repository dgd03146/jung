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

export const dashboardItem = recipe({
	base: {
		display: 'flex',
		alignItems: 'center',
		marginTop: '8px',
		gap: '12px',
		padding: '16px',
		width: '100%',
		height: '56px',
		borderRadius: '8px',
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
