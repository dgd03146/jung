import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const SIDEBAR_WIDTH = '240px';

export const sidebar = recipe({
	base: {
		width: SIDEBAR_WIDTH,
		backgroundColor: palette.white,
		borderRight: '1px solid rgba(0, 0, 0, 0.06)',
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
				transform: `translateX(-${SIDEBAR_WIDTH})`,
			},
		},
	},
});

export const dashboardItem = recipe({
	base: {
		display: 'flex',
		alignItems: 'center',
		marginTop: '4px',
		gap: '10px',
		padding: '10px 14px',
		width: '100%',
		borderRadius: '6px',
		marginBottom: '4px',
		transition: 'background 0.15s ease',
		fontSize: '14px',
		fontWeight: 500,
		color: palette.gray300,
		background: 'transparent',
		border: 'none',

		':hover': {
			background: 'rgba(0, 0, 0, 0.03)',
		},
	},
	variants: {
		active: {
			true: {
				background: 'rgba(0, 0, 0, 0.04)',
				color: palette.text,
				fontWeight: 600,

				':hover': {
					background: 'rgba(0, 0, 0, 0.05)',
				},
			},
		},
	},
});

export const dashboardIcon = style({
	width: '18px',
	height: '18px',
	color: palette.gray300,
});
