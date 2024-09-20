import { style } from '@vanilla-extract/css';

export const titleSection = style({
	position: 'relative',
});

export const titleInput = style({
	fontSize: '2.5rem',
	fontWeight: 700,
	width: '100%',
	border: 'none',
	outline: 'none',
	background: 'transparent',
	'::placeholder': {
		color: 'rgba(55, 53, 47, 0.3)',
	},
});

export const descriptionInput = style({
	fontSize: '1rem',
	resize: 'none',
	width: '100%',
	border: 'none',
	outline: 'none',
	background: 'transparent',
	minHeight: '20px',
	margin: '1rem 0',
	'::placeholder': {
		color: 'rgba(55, 53, 47, 0.3)',
	},
});

export const categorySelect = style({
	width: '100%',
	marginTop: '1rem',
	padding: '0.5rem',
	borderRadius: '0.25rem',
	border: '1px solid rgba(55, 53, 47, 0.2)',
	background: 'transparent',
	outline: 'none',
});

export const optionsContainer = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '0.5rem',
	marginTop: '1rem',
});

export const optionButton = style({
	display: 'flex',
	alignItems: 'center',
	padding: '0.25rem 0.5rem',
	fontSize: '0.75rem',
	color: 'rgba(55, 53, 47, 0.65)',
	backgroundColor: 'rgba(55, 53, 47, 0.08)',
	borderRadius: '0.25rem',
	cursor: 'pointer',
	transition: 'background-color 0.2s ease-in-out',
	':hover': {
		backgroundColor: 'rgba(55, 53, 47, 0.12)',
	},
});

export const imagePreviewContainer = style({
	position: 'relative',
	width: '100%',
	height: '280px',
	borderRadius: '8px',
	overflow: 'hidden',
});

export const imagePreview = style({
	width: '100%',
	height: '100%',
	objectFit: 'cover',
});

export const removeImageButton = style({
	position: 'absolute',
	top: '10px',
	right: '10px',
	backgroundColor: 'rgba(255, 255, 255, 0.7)',
	borderRadius: '50%',
	padding: '5px',
	cursor: 'pointer',
	transition: 'background-color 0.2s ease',
	':hover': {
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
	},
});

export const imageUploadContainer = style({
	width: '100%',
	height: '280px',

	borderRadius: '8px',
	border: '2px dashed rgba(55, 53, 47, 0.2)',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

export const imageUploadButton = style({
	display: 'flex',
	alignItems: 'center',
	gap: '0.5rem',
	padding: '0.5rem 1rem',
	fontSize: '1rem',
	color: 'rgba(55, 53, 47, 0.65)',
	backgroundColor: 'rgba(55, 53, 47, 0.08)',
	borderRadius: '0.25rem',
	cursor: 'pointer',
	transition: 'background-color 0.2s ease-in-out',
	':hover': {
		backgroundColor: 'rgba(55, 53, 47, 0.12)',
	},
});
