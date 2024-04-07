import {
	type LabelHTMLAttributes,
	type PropsWithChildren,
	type ReactNode,
	forwardRef,
} from "react";

import { Box, type BoxProps } from "..";

interface Props
	extends PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>> {}

type LabelProps = BoxProps<"label", Props>;
export type LableComponent = (props: LabelProps) => ReactNode;

export const SelectLabel: LableComponent = forwardRef(
	({ children, ...restProps }, ref?) => {
		return (
			<Box as="label" id="label" ref={ref} {...restProps}>
				{children}
			</Box>
		);
	},
);
