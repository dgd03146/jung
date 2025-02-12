import { type LiHTMLAttributes, type ReactNode, forwardRef } from 'react';

import { Box } from '..';
import type { AtomProps } from '../../types/atoms';

interface Props<T>
	extends Omit<LiHTMLAttributes<HTMLUListElement>, 'color'>,
		AtomProps {
	items: Array<T>;
	renderItem: (item: T) => ReactNode;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const List = forwardRef<HTMLUListElement, Props<any>>(
	({ items, renderItem, ...restProps }, ref) => {
		return (
			<Box as='ul' ref={ref} {...restProps}>
				{items.map(renderItem)}
			</Box>
		);
	},
);
