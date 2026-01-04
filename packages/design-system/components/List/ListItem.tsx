import { forwardRef, type LiHTMLAttributes, type ReactNode } from 'react';
import type { AtomProps } from '../../types/atoms';
import { Box } from '..';

interface Props
	extends Omit<LiHTMLAttributes<HTMLLIElement>, 'prefix' | 'color'>,
		AtomProps {
	prefix?: ReactNode;
	suffix?: ReactNode;
}

export const ListItem = forwardRef<HTMLLIElement, Props>(
	({ prefix, suffix, children, ...restProps }, ref) => {
		return (
			<Box as='li' display='flex' columnGap='1' ref={ref} {...restProps}>
				{prefix}
				{children}
				{suffix}
			</Box>
		);
	},
);
