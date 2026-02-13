import { style } from '@vanilla-extract/css';
import {
	border,
	inputBorder,
	notionBorder,
	notionHoverBg,
	notionSubtleBg,
} from '@/fsd/shared/styles/tokens';

export const imagePreviewContainer = style({
	position: 'relative',
	width: '100%',
	height: '200px',

	overflow: 'hidden',
	backgroundColor: 'white',
	border: `1px solid ${border}`,

	transition: 'all 0.2s ease',

	':hover': {
		border: `1px solid ${inputBorder}`,
	},
});

export const imagePreview = style({
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	transition: 'transform 0.2s ease',
});

export const removeImageButton = style({
	position: 'absolute',
	top: '12px',
	right: '12px',
	width: '32px',
	height: '32px',
	borderRadius: '3px',
	backgroundColor: 'rgba(255, 255, 255, 0.9)',
	border: `1px solid ${notionBorder}`,
	color: 'rgb(55, 53, 47)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	cursor: 'pointer',
	opacity: 0,
	transition: 'all 0.1s ease',

	selectors: {
		[`${imagePreviewContainer}:hover &`]: {
			opacity: 1,
		},
	},

	':hover': {
		backgroundColor: notionHoverBg,
	},
});

export const imageUploadContainer = style({
	position: 'relative',
	width: '100%',
	height: '200px',

	border: `1px dashed ${notionBorder}`,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',

	transition: 'background-color 0.2s ease',
	backgroundColor: notionSubtleBg,

	':hover': {
		backgroundColor: notionHoverBg,
	},
});

export const errorContainer = style({
	position: 'absolute',
	bottom: '16px',
	left: '50%',
	transform: 'translateX(-50%)',
	padding: '6px 12px',
	display: 'flex',
	alignItems: 'center',
	gap: '6px',
	fontSize: '14px',
	fontWeight: '400',
});
