import {
	type LiHTMLAttributes,
	type PropsWithChildren,
	type ReactNode,
	forwardRef,
} from "react";

import { Box, type BoxProps } from "..";

interface Props<T>
	extends PropsWithChildren<LiHTMLAttributes<HTMLUListElement>> {
	items: Array<T>;
	renderItem: (item: T) => ReactNode;
}

type ListProps<T> = BoxProps<"ul", Props<T>>;
export type ListComponent = <T>(props: ListProps<T>) => ReactNode;

export const List: ListComponent = forwardRef(
	({ items, renderItem, ...restProps }, ref?) => {
		return (
			<Box as="ul" ref={ref} {...restProps}>
				{items.map(renderItem)}
			</Box>
		);
	},
);
