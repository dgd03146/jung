import { forwardRef, type LiHTMLAttributes, type ReactNode } from 'react';
import type { AtomProps } from '../../types/atoms';
import { Box } from '..';

interface Props<T>
	extends Omit<LiHTMLAttributes<HTMLUListElement>, 'color'>,
		AtomProps {
	items: Array<T>;
	renderItem: (item: T) => ReactNode;
}

// biome-ignore lint/suspicious/noExplicitAny: generic list component needs any for forwardRef
export const List = forwardRef<HTMLUListElement, Props<any>>(
	({ items, renderItem, ...restProps }, ref) => {
		return (
			<Box as='ul' ref={ref} {...restProps}>
				{items.map(renderItem)}
			</Box>
		);
	},
);
