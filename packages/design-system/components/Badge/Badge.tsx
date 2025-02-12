import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { Box } from '..';
import type { AtomProps } from '../../types/atoms';
import * as styles from './Badge.css';

export interface BadgeProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'prefix' | 'color'>,
		AtomProps {
	variant?: 'primary' | 'secondary' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	rounded?: boolean;
	prefix?: ReactNode;
	suffix?: ReactNode;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
	({ variant, size, rounded, prefix, suffix, children, ...restProps }, ref) => {
		return (
			<Box
				as='div'
				className={styles.badge({ variant, size, rounded })}
				ref={ref}
				{...restProps}
			>
				{prefix && prefix}
				{children}
				{suffix && suffix}
			</Box>
		);
	},
);
