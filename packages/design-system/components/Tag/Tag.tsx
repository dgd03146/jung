import * as S from './Tag.css';

import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';

import { Box } from '..';
import type { AtomProps } from '../../types/atoms';

export interface TagProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'prefix' | 'color'>,
		AtomProps {
	variant?: 'primary' | 'secondary' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	selected?: boolean;
	prefix?: ReactNode;
	suffix?: ReactNode;
}

export const Tag = forwardRef<HTMLDivElement, TagProps>(
	(
		{ variant, size = 'sm', suffix, children, prefix, selected, ...restProps },
		ref,
	) => {
		return (
			<Box
				as='div'
				className={S.tag({ variant, size, selected })}
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
