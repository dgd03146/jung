import { palette } from '@jung/design-system/tokens';
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const fadeIn = keyframes({
	from: {
		opacity: 0,
		transform: 'scale(0.8)',
	},
	to: {
		opacity: 1,
		transform: 'scale(1)',
	},
});

export const searchArea = style({
	display: 'flex',
	gap: '10px',
	justifyContent: 'space-between',
	marginBottom: '8px',
	'@media': {
		'(max-width: 768px)': {
			marginBottom: '4px',
		},
	},
	alignItems: 'center',
	// flexDirection: 'column',
});

export const viewToggleGroup = style({
	display: 'flex',
	gap: '4px',

	borderRadius: '8px',
});

export const viewToggle = recipe({
	base: {
		height: '40px',
		display: 'flex',
		alignItems: 'center',
		gap: '6px',
		padding: '4px 8px',
		border: `1px solid ${palette.primary100}`,
		borderRadius: '8px',
		backgroundColor: palette.white,

		color: palette.primary200,
		fontWeight: 500,

		transition: 'all 0.2s ease',

		':hover': {
			borderColor: palette.primary,
			backgroundColor: palette.primary50,
			color: palette.primary,
		},
	},
	variants: {
		active: {
			true: {
				backgroundColor: palette.primary50,
				color: palette.primary,
				boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
			},
		},
	},
});

export const postList = recipe({
	base: {
		width: '100%',
	},
	variants: {
		viewMode: {
			list: {
				display: 'flex',
				flexDirection: 'column',
			},
			grid: {
				padding: '24px 0',
				display: 'grid',
				gap: '20px',
				gridTemplateColumns: ' repeat(3	, 1fr) ',
				'@media': {
					'(max-width: 1024px)': {
						padding: '12px 0',
						gridTemplateColumns: ' repeat(2, 1fr) ',
					},
					'(max-width: 768px)': {
						gridTemplateColumns: ' repeat(1, 1fr) ',
					},
				},
			},
			table: {
				display: 'flex',
				flexDirection: 'column',
				gap: '2px',

				margin: '0 auto',

				borderRadius: '8px',
				padding: '12px 0',
				'@media': {
					'(max-width: 1024px)': {
						padding: '8px 0',
					},
					'(max-width: 768px)': {
						padding: '4px 0',
					},
				},
			},
		},
	},
});

export const postCard = recipe({
	base: {
		cursor: 'pointer',
		transition: 'all 0.3s ease',
	},
	variants: {
		viewMode: {
			list: {
				display: 'flex',
				gap: '40px',
				padding: '24px 0',
				borderBottom: `1px solid ${palette.primary50}`,

				transition: 'all 0.3s ease',
				position: 'relative',
				':hover': {
					backgroundColor: 'rgba(1, 66, 192, 0.03)',
					transform: 'translateX(8px)',
				},
				'@media': {
					'(max-width: 768px)': {
						gap: '16px',
						padding: '18px 0',
					},
				},
			},
			grid: {
				display: 'flex',
				flexDirection: 'column',
				borderRadius: '8px',
				border: '1px solid rgba(1, 66, 192, 0.08)',
				overflow: 'hidden',
				transition: 'all 0.3s ease',
				':hover': {
					transform: 'translateY(-4px)',
					boxShadow: '0 12px 24px rgba(1, 66, 192, 0.06)',
					borderColor: 'rgba(1, 66, 192, 0.12)',
				},
			},
			table: {
				display: 'flex',
				alignItems: 'center',

				gap: '1rem',
				padding: '12px 0',
				backgroundColor: 'white',
				borderRadius: '4px',

				transition: 'all 0.3s ease',
				':hover': {
					backgroundColor: 'rgba(1, 66, 192, 0.02)',
					transform: 'translateX(4px)',
				},
				borderBottom: `1px solid ${palette.primary50}`,
			},
		},
	},
});

export const contentArea = recipe({
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: '12px',
		flex: 1,
	},
	variants: {
		viewMode: {
			list: {
				order: 0,
			},
			grid: {
				padding: '10px',
			},
		},
	},
});

export const meta = style({
	display: 'flex',
	gap: '12px',
	alignItems: 'center',
	fontSize: '13px',
	color: '#666',
	marginTop: '4px',
});

export const category = style({
	padding: '2px 8px',
	backgroundColor: 'rgba(1, 66, 192, 0.06)',
	color: palette.primary,
	borderRadius: '4px',
	fontSize: '16px',
	fontWeight: '500',
	fontFamily: 'var(--font-bebas)',
	letterSpacing: '0.04em',
});

export const date = style({
	color: palette.primary,
	fontWeight: '400',
	fontSize: '0.75rem',
});

export const title = recipe({
	base: {
		fontSize: '24px',
		fontWeight: '700',
		color: '#1a1a1a',
		lineHeight: '1.4',
		transition: 'color 0.2s ease',
	},
	variants: {
		viewMode: {
			list: {
				'@media': {
					'(max-width: 768px)': {
						fontSize: '16px',
					},
				},
			},
			grid: {
				fontSize: '18px',
			},
			table: {},
		},
	},
});

export const description = recipe({
	base: {
		fontSize: '15px',
		color: palette.primary400,
		lineHeight: '1.6',
		marginBottom: '1rem',
		display: '-webkit-box',
		WebkitLineClamp: 2,
		WebkitBoxOrient: 'vertical',
		overflow: 'hidden',
	},
	variants: {
		viewMode: {
			list: {
				'@media': {
					'(max-width: 768px)': {
						fontSize: '13px',
					},
				},
			},
			grid: {
				fontSize: '14px',
			},
			table: {},
		},
	},
});

export const bottomArea = style({
	marginTop: 'auto',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'flex-end',
	gap: '16px',
});

export const imageArea = recipe({
	base: {
		position: 'relative',
		overflow: 'hidden',
		borderRadius: '8px',
		backgroundColor: '#f8f9fa',
		transition: 'transform 0.3s ease',
	},
	variants: {
		viewMode: {
			list: {
				width: '200px',
				height: 'auto',
				maxInlineSize: '200px',
				blockSize: 'auto',
				aspectRatio: '5/4',
				'@media': {
					'(max-width: 1024px)': {
						width: '200px',
						maxInlineSize: '200px',
						blockSize: 'auto',
						aspectRatio: '5/4',
					},
					'(max-width: 768px)': {
						width: '180px',
						maxInlineSize: '100%',
						height: 'auto',
						aspectRatio: '16/9',
					},
				},
			},
			grid: {
				width: 'auto',
				height: 'auto',
				borderRadius: '8px 8px 0 0',
				blockSize: 'auto',
				aspectRatio: '16/9',
				'@media': {
					'(max-width: 1024px)': {},
				},
			},
			table: {},
		},
	},
});

export const loadingArea = style({
	display: 'flex',
	justifyContent: 'center',
	padding: '20px 0',
	minHeight: '40px',
});

export const cardWrapper = style({
	display: 'block',
	width: '100%',
	textDecoration: 'none',
	transition: 'all 0.3s ease',

	':hover': {
		transform: 'translateY(-4px)',
	},
});

export const tableNumberWrapper = style({
	position: 'relative',
	width: '24px',
	height: '24px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

export const tableNumber = style({
	fontSize: '14px',
	color: palette.primary,
	fontWeight: '500',
	position: 'absolute',
	transition: 'all 0.2s ease',

	selectors: {
		'article:hover &': {
			opacity: 0,
			transform: 'scale(0.8)',
		},
	},
});

export const playButton = style({
	position: 'absolute',
	opacity: 0,
	color: palette.primary,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	transform: 'scale(0.8)',
	transition: 'all 0.2s ease',

	selectors: {
		'article:hover &': {
			opacity: 1,
			transform: 'scale(1)',
			animation: `${fadeIn} 0.2s ease`,
		},
	},
});

export const tableTitle = style({
	fontSize: '16px',
	color: '#333',
	fontWeight: '400',
	letterSpacing: '-0.03em',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',

	selectors: {
		'article:hover &': {
			color: '#0142C0',
		},
	},
});

export const tableDescription = style({
	fontSize: '12px',
	color: palette.primary400,
	fontWeight: '400',
	letterSpacing: '-0.03em',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
});

export const tableDate = style({
	color: palette.primary,
	fontWeight: '400',
	fontSize: '0.75rem',
	textAlign: 'right',
});

export const postLink = style({
	display: 'contents',
	textDecoration: 'none',
	color: 'inherit',
});

export const count = style({
	fontSize: '13px',
	color: '#999',
});

export const mainContent = style({
	minWidth: 0,
	flex: '1',
});

export const content = style({
	display: 'flex',
	gap: '40px',

	'@media': {
		'(max-width: 1024px)': {
			flexDirection: 'column',
			gap: '0',
		},
	},
});

export const emptyState = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '64px 24px',
	textAlign: 'center',
	minHeight: '400px',

	borderRadius: '12px',
	margin: '24px 0',
});

export const emptyIcon = style({
	color: palette.primary,
	marginBottom: '16px',
});

export const emptyDescription = style({
	fontSize: '18px',
	fontWeight: '500',
	color: palette.primary,
});
