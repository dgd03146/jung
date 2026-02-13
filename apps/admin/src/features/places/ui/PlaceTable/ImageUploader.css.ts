import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import {
	hoverBg,
	inputBorder,
	overlay,
	subtleText,
} from '@/fsd/shared/styles/tokens';

export const imageGrid = style({
	display: 'grid',
	gap: '8px',
	gridTemplateColumns: '1fr',
	'@media': {
		'screen and (min-width: 768px)': {
			gridTemplateColumns: 'repeat(2, 1fr)',
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

export const deleteButton = style({
	position: 'absolute',
	top: '12px',
	right: '12px',
	background: overlay,
	color: 'white',
	border: 'none',
	borderRadius: '50%',
	padding: '8px',
	cursor: 'pointer',
	transition: 'all 0.15s ease',
	opacity: 0,
	transform: 'scale(0.9)',
	selectors: {
		[`${imageWrapper}:hover &`]: {
			opacity: 1,
			transform: 'scale(1)',
		},
	},
	':hover': {
		background: 'rgba(0, 0, 0, 0.8)', // intentionally darker than overlay for hover emphasis
	},
});

export const uploadButton = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '8px',
	aspectRatio: '16/9',
	border: `2px dashed ${inputBorder}`,
	borderRadius: '8px',
	cursor: 'pointer',
	background: 'white',
	transition: 'all 0.15s ease',
	padding: '24px',
	':hover': {
		borderColor: palette.primary,
		background: hoverBg,
	},
});

export const uploadIcon = style({
	fontSize: '32px',
	color: subtleText,
	marginBottom: '4px',
});

export const image = style({
	objectFit: 'cover',
});
