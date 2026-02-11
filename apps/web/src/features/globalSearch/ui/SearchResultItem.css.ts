import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const item = style({
	display: 'flex',
	alignItems: 'center',
	gap: '12px',
	padding: '10px 16px',
	cursor: 'pointer',
	borderRadius: '8px',
	transition: 'background-color 0.15s ease',

	selectors: {
		'&:hover, &[data-selected="true"]': {
			backgroundColor: palette.primary50,
		},
	},
});

export const icon = style({
	flexShrink: 0,
	width: '32px',
	height: '32px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '6px',
	backgroundColor: palette.primary50,
	fontSize: '16px',
});

export const content = style({
	flex: 1,
	minWidth: 0,
	overflow: 'hidden',
});

export const title = style({
	fontSize: '14px',
	fontWeight: 500,
	color: palette.primary,
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
});

export const description = style({
	fontSize: '12px',
	color: palette.primary200,
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	marginTop: '2px',
});

export const badge = style({
	flexShrink: 0,
	fontSize: '11px',
	color: palette.primary200,
	padding: '2px 6px',
	borderRadius: '4px',
	backgroundColor: palette.primary50,
});
