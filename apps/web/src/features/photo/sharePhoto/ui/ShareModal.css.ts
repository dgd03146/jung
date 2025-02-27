import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const shareModalContent = style({
	padding: '4px',
	display: 'flex',
	flexDirection: 'column',
	gap: '10px',
	width: '100%',

	position: 'relative',
});

export const header = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: '4px',
});

export const closeButton = style({
	padding: '8px',
	background: 'transparent',
	border: 'none',
	cursor: 'pointer',
	borderRadius: '50%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	transition: 'all 0.2s ease',
	color: '#666',

	':hover': {
		backgroundColor: 'rgba(0, 0, 0, 0.05)',
		color: '#000',
	},
});

export const socialButtons = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gap: '8px',
	width: '100%',
});

const baseButtonStyle = style({
	display: 'flex',
	alignItems: 'center',
	border: 'none',
	fontWeight: '500',
	transition:
		'transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease',
	borderRadius: '8px',
	padding: '4px',
	gap: '4px',

	':hover': {
		transform: 'translateY(-1px)',
	},
	':active': {
		transform: 'translateY(0)',
	},
});

export const socialButton = recipe({
	base: baseButtonStyle,

	variants: {
		platform: {
			kakao: {
				backgroundColor: '#FEE500',
				color: '#000000',
				border: '1px solid #FEE500',
				':hover': {
					backgroundColor: '#FADA0A',
					boxShadow: '0 2px 4px rgba(254,229,0,0.3)',
					transform: 'translateY(-2px)',
				},
			},
			whatsapp: {
				backgroundColor: '#25D366',
				color: '#FFFFFF',
				border: '1px solid #25D366',
				':hover': {
					backgroundColor: '#22C35E',
					boxShadow: '0 2px 4px rgba(37,211,102,0.3)',
					transform: 'translateY(-2px)',
				},
			},
			x: {
				backgroundColor: '#000000',
				color: '#FFFFFF',
				border: '1px solid #000000',
				':hover': {
					backgroundColor: '#333333',
					boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
					transform: 'translateY(-2px)',
				},
			},
			linkedin: {
				backgroundColor: '#0A66C2',
				color: '#FFFFFF',
				border: '1px solid #0A66C2',
				':hover': {
					backgroundColor: '#0958A8',
					boxShadow: '0 2px 4px rgba(10,102,194,0.3)',
					transform: 'translateY(-2px)',
				},
			},
		},

		size: {
			small: {
				fontSize: '14px',
				padding: '4px 8px',
			},
			medium: {
				fontSize: '16px',
				padding: '6px 12px',
			},
		},
	},

	defaultVariants: {
		size: 'medium',
	},
});

export const divider = style({
	width: '100%',
	height: '1px',
	backgroundColor: 'rgba(0, 0, 0, 0.08)',
	margin: '4px 0',
});
