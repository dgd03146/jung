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
	border: palette.white100,
	background: palette.white100,
	textMuted: palette.gray200,
	textBody: palette.text,
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
	backgroundColor: palette.white,
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
	maxWidth: '300px',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',

	'@media': {
		'(max-width: 768px)': {
			padding: `${spacing.sm} ${spacing.md}`,
			fontSize: fontSize.sm,
		},
	},
});

export const row = style({
	transition: 'all 0.2s ease',
	backgroundColor: palette.white,

	':hover': {
		backgroundColor: colors.background,
	},
});

export const toggleSortingButton = style({
	color: palette.primary,
	':hover': {
		transition: 'color 0.3s ease-in-out',
		color: palette.primary200,
	},
});

export const paginationButton = style({
	border: 'none',
});

export const categoryBadge = style({
	padding: '4px 8px',
	borderRadius: '4px',
	fontSize: fontSize.xs,
	fontWeight: '500',
	textTransform: 'uppercase',
});

export const frontendBadge = style([
	categoryBadge,
	{
		backgroundColor: palette.primary50,
		color: palette.primary,
	},
]);

export const aiBadge = style([
	categoryBadge,
	{
		backgroundColor: '#F3E8FF',
		color: '#9333EA',
	},
]);
