import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const messageCard = recipe({
	base: {
		borderRadius: '12px',
		padding: '1rem',
		boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
		transition: 'all 0.2s ease',
		border: '1px solid #F0F0F0',
		position: 'relative',
		height: '100%',

		':hover': {
			boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
			borderColor: palette.primary50,
		},
	},
	variants: {
		backgroundColor: {
			'#FFFFFF': { backgroundColor: '#FFFFFF' },
			'#FFF3E0': { backgroundColor: '#FFF3E0' },
			'#E8F5E9': { backgroundColor: '#E8F5E9' },
			'#E3F2FD': { backgroundColor: '#E3F2FD' },
			'#F3E5F5': { backgroundColor: '#F3E5F5' },
			'#FFF8E1': { backgroundColor: '#FFF8E1' },
			'#E0F7FA': { backgroundColor: '#E0F7FA' },
		},
	},
	defaultVariants: {
		backgroundColor: '#FFFFFF',
	},
});

export const messageEmoji = style({
	position: 'absolute',
	top: '1.5rem',
	right: '1.5rem',
	fontSize: '1.25rem',
	width: '28px',
	height: '28px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: palette.primary50,
	borderRadius: '8px',
	color: palette.primary,
});

export const avatar = style({
	width: '24px',
	height: '24px',
	borderRadius: '50%',
	objectFit: 'cover',
	// border: `1px solid ${palette.primary}`,
});
