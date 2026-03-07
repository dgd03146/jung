import { style } from '@vanilla-extract/css';

const primaryLightColor = 'rgba(59, 130, 246, 0.1)';

export const userAvatar = style({
	width: '32px',
	height: '32px',
	borderRadius: '50%',
	objectFit: 'cover',
	border: `1.5px solid ${primaryLightColor}`,
});

export const defaultAvatar = style({
	width: '32px',
	height: '32px',
	borderRadius: '50%',
	border: '1.5px solid rgba(59, 130, 246, 0.15)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: 'rgba(59, 130, 246, 0.04)',
	color: 'rgba(59, 130, 246, 0.5)',
	flexShrink: 0,
});
