import {
	type LiHTMLAttributes,
	type PropsWithChildren,
	type ReactNode,
	forwardRef,
} from "react";

import { Box, type BoxProps } from "..";

interface Props
	extends PropsWithChildren<Omit<LiHTMLAttributes<HTMLLIElement>, "prefix">> {
	prefix?: ReactNode;
	suffix?: ReactNode;
}

type ListItemProps = BoxProps<"li", Props>;
type ListItemComponent = (props: ListItemProps) => ReactNode;

export const ListItem: ListItemComponent = forwardRef(
	({ prefix, suffix, children, ...restProps }, ref?) => {
		return (
			<Box as="li" display="flex" columnGap="1" ref={ref} {...restProps}>
				{prefix}
				{children}
				{suffix}
			</Box>
		);
	},
);
