import { type HTMLAttributes, forwardRef } from "react";

import type {
	responsiveProperties,
	unresponsiveProperties,
} from "@/styles/sprinkles.css";
import { Box, type BoxProps } from "..";

interface Props extends HTMLAttributes<HTMLDivElement> {
	align?: keyof typeof responsiveProperties.styles.alignItems.values;
	justify?: keyof typeof responsiveProperties.styles.justifyContent.values;
	direction?: keyof typeof responsiveProperties.styles.flexDirection.values;
	grow?: keyof typeof unresponsiveProperties.styles.flexGrow.values;
	wrap?: keyof typeof responsiveProperties.styles.flexWrap.values;
	shrink?: keyof typeof unresponsiveProperties.styles.flexShrink.values;
}

type FlexProps = BoxProps<"div", Props>;
type FlexComponent = (props: FlexProps) => React.ReactNode;

export const Flex: FlexComponent = forwardRef(
	({ align, justify, direction, grow, wrap, shrink, ...restProps }, ref?) => {
		return (
			<Box
				as="div"
				display="flex"
				alignItems={align}
				justifyContent={justify}
				flexDirection={direction}
				flexGrow={grow}
				flexShrink={shrink}
				flexWrap={wrap}
				ref={ref}
				{...restProps}
			/>
		);
	},
);
