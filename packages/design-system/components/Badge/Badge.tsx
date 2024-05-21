import * as styles from './Badge.css';

import { type HTMLAttributes, forwardRef } from 'react';

import { Box } from '..';
import type { AtomProps } from '../../types/atoms';

export interface BadgeProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	variant?: 'primary' | 'secondary' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	rounded?: boolean;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
	({ variant, size, rounded, children, ...restProps }, ref) => {
		return (
			<Box
				as='div'
				display='inline-block'
				className={styles.badge({ variant, size, rounded })}
				ref={ref}
				{...restProps}
			>
				{children}
			</Box>
		);
	},
);
