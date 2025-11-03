import { style } from '@vanilla-extract/css';

const primaryLightColor = 'rgba(59, 130, 246, 0.1)';

export const userAvatar = style({
	width: '40px',
	height: '40px',
	borderRadius: '50%',
	objectFit: 'cover',
	border: `2px solid ${primaryLightColor}`,
});
