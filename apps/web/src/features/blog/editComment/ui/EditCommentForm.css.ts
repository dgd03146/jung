import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

const primaryLightColor = 'rgba(59, 130, 246, 0.1)';

export const commentContainer = style({
	borderRadius: '12px',
	border: `1px solid ${palette.primary50}`,
	padding: '16px',
	marginBottom: '16px',
	transition: 'all 0.2s ease',
	backgroundColor: '#FFFFFF',
	':hover': {
		boxShadow: `0 2px 8px ${primaryLightColor}`,
	},
});
