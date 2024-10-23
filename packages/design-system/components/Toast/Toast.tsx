import React, { type HTMLAttributes } from 'react';
import * as styles from './Toast.css';

import { ToastType } from '@jung/shared/types';
import {
	FaCheckCircle,
	FaExclamationCircle,
	FaExclamationTriangle,
	FaInfoCircle,
} from 'react-icons/fa';
import { Box, Typography } from '..';
import type { AtomProps } from '../../types/atoms';

export interface ToastProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	message: string;
	type?: ToastType;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
	({ message, type = ToastType.SUCCESS, className, ...restProps }, ref) => {
		const IconComponent =
			type === ToastType.SUCCESS
				? FaCheckCircle
				: type === ToastType.ERROR
				  ? FaExclamationCircle
				  : type === ToastType.WARNING
					  ? FaExclamationTriangle
					  : FaInfoCircle;

		return (
			<Box ref={ref} className={styles.toastRecipe({ type })} {...restProps}>
				<IconComponent className={styles.icon} />
				<Typography.SubText className={styles.message}>
					{message}
				</Typography.SubText>
			</Box>
		);
	},
);

Toast.displayName = 'Toast';
