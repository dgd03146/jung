import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const imageGrid = style({
	display: 'grid',
	gap: '3px',
	padding: '0',
	height: '100%',
	width: '100%',
	borderRadius: '12px',
});

export const gridVariants = recipe({
	variants: {
		count: {
			single: {
				gridTemplate: '1fr / 1fr',
			},
			two: {
				gridTemplateAreas: `"main sub1"`,
				gridTemplateColumns: '2fr 1fr',
			},
			three: {
				gridTemplateAreas: `
					"main sub1"
					"main sub2"
				`,
				gridTemplateColumns: '2fr 1fr',
				gridTemplateRows: 'repeat(2, 1fr)',
			},
			four: {
				gridTemplateAreas: `
					"main sub1"
					"main sub2"
					"main sub3"
				`,
				gridTemplateColumns: '2fr 1fr',
				gridTemplateRows: 'repeat(3, 1fr)',
			},
		},
	},
	defaultVariants: {
		count: 'four',
	},
});

// recipe의 variants 타입 추출
export type GridVariant = NonNullable<
	Parameters<typeof gridVariants>[0]
>['count'];

export const imageWrapper = style({
	position: 'relative',
	width: '100%',
	height: '100%',
	overflow: 'hidden',
});

export const mainImage = style({
	gridArea: 'main',
	height: '100%',
});

export const gridImage = style({
	objectFit: 'cover',
	transition: 'transform 0.3s ease',
	height: '100%',

	':hover': {
		transform: 'scale(1.05)',
	},
});

export const lastImageOverlay = style({
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: 'rgba(0, 0, 0, 0.4)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: 'white',
	fontSize: '20px',
	fontWeight: '600',
	cursor: 'pointer',
});
