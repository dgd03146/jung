import { createVar, style } from '@vanilla-extract/css';

export const levelIndent = createVar();
export const borderColor = createVar();

export const categoryCard = style({
	background: 'white',
	borderRadius: '12px',
	border: '1px solid #f1f5f9',
	borderTopWidth: '4px',
	borderTopStyle: 'solid',
	borderTopColor: borderColor,
	overflow: 'hidden',
	transition: 'all 0.2s ease',
	position: 'relative',
	marginLeft: levelIndent,

	':hover': {
		transform: 'translateY(-2px)',
		boxShadow: '0 8px 16px rgba(0, 0, 0, 0.06)',
	},

	vars: {
		[levelIndent]: '0px',
		[borderColor]: '#0142C0',
	},
});

export const expandButton = style({
	background: 'transparent',
	border: 'none',
	padding: '4px 8px',
	cursor: 'pointer',
	color: '#64748b',
	transition: 'color 0.2s ease',

	':hover': {
		color: '#0142C0',
	},
});

export const parentBadge = style({
	display: 'inline-block',
	padding: '2px 6px',
	fontSize: '11px',
	fontWeight: '500',
	color: '#64748b',
	background: '#f1f5f9',
	borderRadius: '4px',
	marginLeft: '8px',
});

export const postCount = style({
	display: 'inline-flex',
	alignItems: 'center',
	height: '24px',
	padding: '0 8px',
	fontSize: '12px',
	fontWeight: '500',
	color: '#64748B',
	background: '#F1F5F9',
	borderRadius: '4px',
});

export const actions = style({
	display: 'flex',
	gap: '4px',
});

export const actionButton = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '28px',
	height: '28px',
	border: 'none',
	borderRadius: '6px',
	color: '#94a3b8',
	background: 'transparent',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		background: '#f1f5f9',
		color: '#0142C0',
	},
});

export const dragHandle = style({
	cursor: 'grab',
	color: '#94a3b8',
	padding: '0 8px',
	fontSize: '18px',
	display: 'flex',
	alignItems: 'center',

	':active': {
		cursor: 'grabbing',
	},
});
