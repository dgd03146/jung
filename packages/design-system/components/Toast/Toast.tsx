import React, { type HTMLAttributes } from 'react';
import * as S from './Toast.css';

import { Box, Typography } from '..';
import type { AtomProps } from '../../types/atoms';

export interface ToastProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	message: string;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
	({ message, className, ...restProps }, ref) => {
		return (
			<Box ref={ref} className={S.toast} {...restProps}>
				<Typography.SubText color='white'>{message}</Typography.SubText>
			</Box>
		);
	},
);
