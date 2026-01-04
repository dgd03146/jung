import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { AtomProps } from '../../types/atoms';

import { Box } from '..';
import * as S from './Tag.css';

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
