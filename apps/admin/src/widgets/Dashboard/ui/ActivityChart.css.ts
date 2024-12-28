import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const container = style({
	background: '#FFFFFF',
	borderRadius: '16px',
	border: '1px solid #F1F3F9',
	overflow: 'hidden',
	boxShadow:
		'0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06)',
	width: '100%',
	height: '100%',
});

export const header = style({
	padding: '1.25rem 1.5rem',
	borderBottom: '1px solid #F1F3F9',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	background: '#FFFFFF',
});

export const title = style({
	fontSize: '1rem',
	fontWeight: '600',
	color: palette.primary,
	letterSpacing: '-0.01em',
});

export const chartArea = style({
	padding: '1.5rem',
	height: '320px',
	background: '#FFFFFF',
});

export const controls = style({
	display: 'flex',
	gap: '0.75rem',
	alignItems: 'center',
});

export const select = style({
	padding: '0.625rem 1rem',
	borderRadius: '10px',
	border: '1px solid #E5E7EB',
	background: '#F9FAFB',
	fontSize: '0.875rem',
	color: '#374151',
	cursor: 'pointer',
	outline: 'none',
	minWidth: '130px',
	appearance: 'none',
	backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'right 1rem center',
	paddingRight: '2.5rem',
	transition: 'all 0.2s ease',

	':hover': {
		background: '#F3F4F6',
		borderColor: '#D1D5DB',
	},

	':focus': {
		borderColor: '#6366F1',
		boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.1)',
		background: '#FFFFFF',
	},
});

export const tooltipContainer = style({
	background: '#FFFFFF',
	border: '1px solid #F1F3F9',
	borderRadius: '12px',
	padding: '0.875rem 1rem',
	boxShadow:
		'0 4px 6px -1px rgba(16, 24, 40, 0.1), 0 2px 4px -2px rgba(16, 24, 40, 0.1)',
});

export const tooltipLabel = style({
	fontSize: '0.75rem',
	color: '#6B7280',
	marginBottom: '0.75rem',
	fontWeight: '500',
	letterSpacing: '0.02em',
});

export const tooltipValue = style({
	fontSize: '0.875rem',
	fontWeight: '500',
	display: 'flex',
	alignItems: 'center',
	gap: '0.5rem',
	lineHeight: '1.6',
	color: '#374151',
});

export const tooltipDot = style({
	width: '8px',
	height: '8px',
	borderRadius: '50%',
	display: 'inline-block',
});
