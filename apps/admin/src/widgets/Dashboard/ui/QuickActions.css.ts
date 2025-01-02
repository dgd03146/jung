import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const container = style({
	background: palette.white,
	borderRadius: '12px',
	border: `1px solid ${palette.white200}`,
	overflow: 'hidden',
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

export const actionGrid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
	gap: '2px',
	background: palette.primary50,
	padding: '2px',
});

export const actionButton = style({
	display: 'flex',
	alignItems: 'center',
	gap: '1rem',
	padding: '1.25rem',
	background: palette.white,
	border: 'none',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		backgroundColor: 'rgba(1, 66, 192, 0.02)',
		transform: 'translateY(-2px)',
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
	textAlign: 'left',
});

export const actionTitle = style({
	fontSize: '0.875rem',
	fontWeight: '500',
	color: palette.primary300,
	marginBottom: '0.25rem',
});

export const actionDescription = style({
	fontSize: '0.75rem',
	color: palette.gray300,
});
