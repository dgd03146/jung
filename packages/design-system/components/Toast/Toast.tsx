import type { ToastType } from '@jung/shared/types';
import React, { type HTMLAttributes } from 'react';
import {
	FaCheckCircle,
	FaExclamationCircle,
	FaExclamationTriangle,
	FaInfoCircle,
} from 'react-icons/fa';
import type { AtomProps } from '../../types/atoms';
import { Box, Typography } from '..';
import * as styles from './Toast.css';

export interface ToastProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	message: string;
	type?: ToastType;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
	({ message, type = 'success', className, ...restProps }, ref) => {
		const IconComponent =
			type === 'success'
				? FaCheckCircle
				: type === 'error'
					? FaExclamationCircle
					: type === 'warning'
						? FaExclamationTriangle
						: FaInfoCircle;

		return (
			<Box
				ref={ref}
				className={`${styles.toastRecipe({ type })} ${className || ''}`}
				{...restProps}
			>
				<IconComponent className={styles.icon} />
				<Typography.SubText className={styles.message}>
					{message}
				</Typography.SubText>
			</Box>
		);
	},
);

Toast.displayName = 'Toast';
