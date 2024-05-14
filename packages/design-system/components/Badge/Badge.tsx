import * as S from './Badge.css';

import { type HTMLAttributes, forwardRef } from 'react';

import { Box } from '..';
import type { AtomProps } from '../../types/atoms';

interface Props
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	variant?: 'primary' | 'secondary' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	rounded?: boolean;
}

export const Badge = forwardRef<HTMLDivElement, Props>(
	({ variant, size, rounded, children, ...restProps }, ref) => {
		const badgeStyle = S.badge({ variant, size, rounded });

		return (
			<Box
				as='div'
				display='inline-block'
				className={badgeStyle}
				ref={ref}
				{...restProps}
			>
				{children}
			</Box>
		);
	},
);
