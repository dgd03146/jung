import { style } from '@vanilla-extract/css';

export const imagePreviewContainer = style({
	position: 'relative',
	width: '100%',
	height: '200px',

	overflow: 'hidden',
	backgroundColor: '#fff',
	border: '1px solid rgba(0, 0, 0, 0.08)',
	// marginBottom: '24px',
	transition: 'all 0.2s ease',

	':hover': {
		border: '1px solid rgba(0, 0, 0, 0.16)',
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
	border: '1px solid rgba(55, 53, 47, 0.16)',
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
		backgroundColor: 'rgba(55, 53, 47, 0.08)',
	},
});

export const imageUploadContainer = style({
	position: 'relative',
	width: '100%',
	height: '200px',

	border: '1px dashed rgba(55, 53, 47, 0.16)',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	// marginBottom: '24px',
	transition: 'background-color 0.2s ease',
	backgroundColor: 'rgba(55, 53, 47, 0.03)',

	':hover': {
		backgroundColor: 'rgba(55, 53, 47, 0.08)',
	},

	// selectors: {
	// 	'&[data-error="true"]': {
	// 		borderColor: 'rgb(235, 87, 87)',
	// 		backgroundColor: 'rgba(235, 87, 87, 0.03)',
	// 	},
	// },
});

export const imageUploadButton = style({
	display: 'flex',
	alignItems: 'center',
	gap: '6px',
	padding: '6px 12px',
	borderRadius: '3px',
	backgroundColor: 'transparent',
	border: '1px solid rgba(0, 102, 255, 0.3)',
	color: '#0142C0',
	fontSize: '14px',
	fontWeight: '500',
	cursor: 'pointer',
	transition: 'all 0.2s ease',

	':hover': {
		backgroundColor: 'rgba(0, 102, 255, 0.04)',
		borderColor: '#0142C0',
		transform: 'translateY(-1px)',
		boxShadow: '0 2px 4px rgba(0, 102, 255, 0.1)',
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
	color: 'rgb(235, 87, 87)',
	fontSize: '14px',
	fontWeight: '400',
});

export const dropText = style({
	color: 'rgba(55, 53, 47, 0.5)',
	fontSize: '14px',
	marginTop: '8px',
});
