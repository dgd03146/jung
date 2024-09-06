import { style } from '@vanilla-extract/css';

const titleSection = style({
	position: 'relative',
	marginTop: '3rem',
});

const titleInput = style({
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

const optionsContainer = style({
	display: 'flex',
	gap: '0.5rem',
	position: 'absolute',
	top: '-2.5rem',
	left: 0,
	right: 0,
	opacity: 0,
	transition: 'opacity 0.2s ease-in-out',
	zIndex: 1,
	selectors: {
		[`${titleSection}:hover &`]: {
			opacity: 1,
		},
	},
});

const optionButton = style({
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

const imagePreviewContainer = style({
	position: 'relative',
	width: '100%',
	height: '200px',
	marginBottom: '1rem',
	borderRadius: '8px',
	overflow: 'hidden',
});

const imagePreview = style({
	width: '100%',
	height: '100%',
	objectFit: 'cover',
});

const removeImageButton = style({
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

export {
	titleSection,
	titleInput,
	optionsContainer,
	optionButton,
	imagePreviewContainer,
	imagePreview,
	removeImageButton,
};
