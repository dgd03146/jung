import { style } from '@vanilla-extract/css';

export const wrapper = style({
	width: '100%',
	borderRadius: '12px',

	background: '#f8f9fa',
	border: '1px solid #e9ecef',
});

export const imageGrid = style({
	display: 'grid',
	gap: '8px',
	gridTemplateColumns: '1fr',
	'@media': {
		'screen and (min-width: 768px)': {
			gridTemplateColumns: 'repeat(2, 1fr)',
		},
	},
	selectors: {
		'&[data-count="0"]': {
			gridTemplateColumns: '1fr',
		},
		'&[data-count="1"]': {
			gridTemplateColumns: '1fr 1fr',
		},
		'&[data-count="2"]': {
			gridTemplateColumns: 'repeat(2, 1fr)',
		},
		'&[data-count="3"]': {
			gridTemplateAreas: `
				"img1 img2"
				"img3 img4"
			`,
		},
		'&[data-count="4"]': {
			gridTemplateAreas: `
				"img1 img2"
				"img3 img4"
			`,
		},
	},
});

export const imageWrapper = style({
	position: 'relative',
	aspectRatio: '16/9',
	borderRadius: '8px',
	overflow: 'hidden',
	boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
	transition: 'transform 0.2s ease',
	background: 'white',
	':hover': {
		transform: 'scale(1.01)',
	},
});

export const image = style({
	width: '100%',
	height: '100%',
	objectFit: 'cover',
});

export const deleteButton = style({
	position: 'absolute',
	top: '12px',
	right: '12px',
	background: 'rgba(0, 0, 0, 0.6)',
	color: 'white',
	border: 'none',
	borderRadius: '50%',
	padding: '8px',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	opacity: 0,
	transform: 'scale(0.9)',
	selectors: {
		[`${imageWrapper}:hover &`]: {
			opacity: 1,
			transform: 'scale(1)',
		},
	},
	':hover': {
		background: 'rgba(0, 0, 0, 0.8)',
	},
});

export const uploadButton = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '8px',
	aspectRatio: '16/9',
	border: '2px dashed #dee2e6',
	borderRadius: '12px',
	cursor: 'pointer',
	background: 'white',
	transition: 'all 0.2s ease',
	padding: '24px',
	':hover': {
		borderColor: '#228be6',
		background: '#f8f9fa',
	},
});

export const uploadIcon = style({
	fontSize: '32px',
	color: '#adb5bd',
	marginBottom: '4px',
});

export const uploadText = style({
	fontSize: '15px',
	fontWeight: 500,
	color: '#495057',
});

export const uploadSubtext = style({
	fontSize: '13px',
	color: '#868e96',
});

export const fileInput = style({
	display: 'none',
});
