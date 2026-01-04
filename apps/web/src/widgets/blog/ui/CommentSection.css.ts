import { style } from '@vanilla-extract/css';

// Comment item styles
const veryLightBlueColor = 'rgba(59, 130, 246, 0.03)';
const primaryLightColor = 'rgba(59, 130, 246, 0.1)';
const borderColor = '#E2E8F0';

export const nestedCommentItem = style({
	marginBottom: '12px',
	paddingBottom: '8px',
	borderBottom: `1px solid ${borderColor}`,
	':last-child': {
		marginBottom: 0,
		paddingBottom: 0,
		borderBottom: 'none',
	},
});

export const replyContainer = style({
	marginLeft: '30px',
	marginTop: '8px',
	padding: '12px',
	borderLeft: `2px solid ${primaryLightColor}`,
	backgroundColor: veryLightBlueColor,
	borderRadius: '0 12px 12px 0',
});
