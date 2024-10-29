import { style } from '@vanilla-extract/css';
import {
	commentContainer,
	commentHeader,
	userAvatar,
} from '../../../features/blog/comment/ui/CommentList.css';

export const errorContainer = style([
	commentContainer,
	{
		margin: '16px 0',
		backgroundColor: 'rgba(220, 38, 38, 0.05)',
		border: '1px solid rgba(220, 38, 38, 0.2)',
	},
]);

export const errorHeader = style([
	commentHeader,
	{
		marginBottom: '8px',
	},
]);

export const errorAvatar = style([
	userAvatar,
	{
		backgroundColor: '#DC2626',
		marginRight: '8px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
]);

export const errorIcon = style({
	color: '#FFFFFF',
});

export const errorContent = style({
	marginTop: '8px',
});

export const errorMessage = style({
	color: '#DC2626',
	fontSize: '14px',
	lineHeight: 1.5,
});

export const retryButtonContainer = style({
	display: 'flex',
	justifyContent: 'flex-end',
	marginTop: '12px',
});

export const retryButton = style({
	marginTop: '12px',
	padding: '6px 12px',
	backgroundColor: '#DC2626',
	color: '#FFFFFF',
	border: 'none',
	borderRadius: '4px',
	cursor: 'pointer',
	transition: 'background-color 0.2s',
	':hover': {
		backgroundColor: '#B91C1C',
	},
});
