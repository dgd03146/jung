import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const container = style({
	background: palette.white,
	borderRadius: '12px',
	border: `1px solid ${palette.white200}`,
	overflow: 'hidden',
	width: '100%',
	height: '100%',
});

export const header = style({
	padding: '1.5rem',
	borderBottom: `1px solid ${palette.primary50}`,
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
});

export const title = style({
	fontSize: '1rem',
	fontWeight: '600',
	color: palette.primary,
	letterSpacing: '-0.03em',
});

export const activityList = style({
	display: 'flex',
	flexDirection: 'column',
});

export const activityItem = style({
	display: 'flex',
	alignItems: 'center',
	gap: '1rem',
	padding: '1rem 1.5rem',
	transition: 'all 0.2s ease',
	borderBottom: `1px solid ${palette.primary50}`,
	cursor: 'pointer',

	':hover': {
		backgroundColor: 'rgba(1, 66, 192, 0.02)',
		transform: 'translateX(4px)',
	},

	selectors: {
		'&:last-child': {
			borderBottom: 'none',
		},
	},
});

export const iconWrapper = style({
	width: '40px',
	height: '40px',
	borderRadius: '8px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: palette.primary50,
	color: palette.primary,
	flexShrink: 0,
});

export const contentArea = style({
	flex: 1,
	minWidth: 0,
});

export const activityTitle = style({
	fontSize: '0.875rem',
	fontWeight: '500',
	color: palette.primary300,
	marginBottom: '0.25rem',
});

export const activityMeta = style({
	display: 'flex',
	alignItems: 'center',
	gap: '0.5rem',
	fontSize: '0.75rem',
});

export const description = style({
	color: palette.primary300,
	fontWeight: '400',
});

export const time = style({
	color: palette.gray300,
	fontSize: '0.75rem',
});

export const separator = style({
	color: palette.gray300,
	fontSize: '0.75rem',
});

export const tag = style({
	padding: '2px 8px',
	borderRadius: '4px',
	backgroundColor: palette.primary50,
	color: palette.primary,
	fontSize: '0.75rem',
	fontWeight: '500',
	textTransform: 'capitalize',
});
