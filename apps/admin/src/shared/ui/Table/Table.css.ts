import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

const spacing = {
	sm: '12px',
	md: '16px',
	lg: '24px',
} as const;

const fontSize = {
	xs: '12px',
	sm: '13px',
	md: '14px',
} as const;

const colors = {
	border: '#F1F5F9',
	background: '#F8FAFC',
	textMuted: '#64748B',
	textBody: '#334155',
	inputBorder: '#E2E8F0',
	hoverBorder: '#CBD5E1',
} as const;

export const tableAction = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: spacing.lg,
	borderBottom: `1px solid ${colors.border}`,
	backgroundColor: colors.background,
	flexWrap: 'wrap',
	gap: spacing.md,
});

export const th = style({
	padding: `${spacing.md} ${spacing.lg}`,
	backgroundColor: 'white',
	borderBottom: `1px solid ${colors.border}`,
	textAlign: 'left',
	whiteSpace: 'nowrap',
	fontSize: fontSize.sm,
	fontWeight: '600',
	color: colors.textMuted,
	transition: 'all 0.2s ease',

	'@media': {
		'(max-width: 768px)': {
			padding: `${spacing.sm} ${spacing.md}`,
			fontSize: fontSize.xs,
		},
	},
});

export const td = style({
	padding: `${spacing.md} ${spacing.lg}`,
	borderBottom: `1px solid ${colors.border}`,
	fontSize: fontSize.md,
	color: colors.textBody,
	transition: 'all 0.2s ease',
	verticalAlign: 'middle',

	'@media': {
		'(max-width: 768px)': {
			padding: `${spacing.sm} ${spacing.md}`,
			fontSize: fontSize.sm,
		},
	},
});

export const row = style({
	transition: 'all 0.2s ease',
	backgroundColor: 'white',

	':hover': {
		backgroundColor: colors.background,
	},
});

export const toggleSortingButton = style({
	color: palette.primary,
	transition: 'color 0.3s ease-in-out',
	':hover': {
		color: palette.primary200,
	},
});

export const searchInput = style({
	width: '280px',
	padding: '8px 16px',
	borderRadius: '8px',
	border: `1px solid ${colors.inputBorder}`,
	backgroundColor: 'white',
	fontSize: fontSize.md,
	transition: 'all 0.2s ease',
	boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',

	':focus': {
		outline: 'none',
		borderColor: palette.primary,
		boxShadow: '0 0 0 3px rgba(1, 66, 192, 0.1)',
	},

	'::placeholder': {
		color: '#94A3B8',
	},

	'@media': {
		'(max-width: 1024px)': {
			width: '200px',
			fontSize: fontSize.sm,
			padding: '10px 16px',
		},
		'(max-width: 768px)': {
			width: '100%',
			maxWidth: '400px',
			margin: '0 auto',
		},
		'(max-width: 640px)': {
			fontSize: fontSize.md,
			padding: `${spacing.sm} ${spacing.md}`,
			maxWidth: 'none',
		},
		'(max-width: 480px)': {
			borderRadius: '8px',
			padding: '10px 14px',
		},
	},
});

export const newButton = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	padding: '8px 16px',
	borderRadius: '8px',
	backgroundColor: palette.primary,
	color: 'white',
	border: 'none',
	fontSize: fontSize.md,
	fontWeight: '500',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	boxShadow: '0 1px 2px rgba(1, 66, 192, 0.1)',

	':hover': {
		backgroundColor: '#0052CC',
		transform: 'translateY(-1px)',
		boxShadow: '0 4px 6px rgba(1, 66, 192, 0.1)',
	},
});

export const actionButton = style({
	padding: '10px',
	borderRadius: '10px',
	backgroundColor: colors.background,
	border: `1px solid ${colors.inputBorder}`,
	color: colors.textMuted,
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	':hover': {
		backgroundColor: colors.border,
		color: '#0142C0',
		borderColor: colors.hoverBorder,
		transform: 'translateY(-1px)',
	},
});

export const categoryBadge = style({
	display: 'inline-flex',
	padding: '4px 8px',
	borderRadius: '4px',
	fontSize: fontSize.xs,
	fontWeight: '500',
	textTransform: 'uppercase',
});

export const pagination = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: `${spacing.md} ${spacing.lg}`,
	borderTop: `1px solid ${colors.border}`,
	backgroundColor: colors.background,
	flexWrap: 'wrap',
	gap: spacing.md,

	'@media': {
		'(max-width: 768px)': {
			flexDirection: 'column',
			alignItems: 'center',
			padding: spacing.md,
		},
	},
});

export const pageButton = style({
	padding: '8px 16px',
	borderRadius: '10px',
	border: `1px solid ${colors.inputBorder}`,
	backgroundColor: 'white',
	color: colors.textMuted,
	fontSize: fontSize.md,
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	display: 'flex',
	alignItems: 'center',
	gap: '4px',

	'@media': {
		'(max-width: 768px)': {
			padding: '6px 12px',
			fontSize: fontSize.sm,
		},
	},

	':hover': {
		backgroundColor: colors.border,
		borderColor: colors.hoverBorder,
	},
});
