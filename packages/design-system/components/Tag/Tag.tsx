import * as S from './Tag.css';

import { type HTMLAttributes, forwardRef } from 'react';

import { Box, Typography } from '..';
import type { AtomProps } from '../../types/atoms';

export interface TagProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	variant?: 'primary' | 'secondary' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	rounded?: boolean;
}

export const Tag = forwardRef<HTMLDivElement, TagProps>(
	({ variant, size, rounded, children, ...restProps }, ref) => {
		return (
			<Box
				as='div'
				display='inline-block'
				className={S.tag({ variant, size, rounded })}
				ref={ref}
				{...restProps}
			>
				<Typography.SubText level={2}>{children}</Typography.SubText>
			</Box>
		);
	},
);
