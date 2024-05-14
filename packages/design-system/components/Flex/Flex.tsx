import { type HTMLAttributes, forwardRef } from 'react';

import { Box } from '..';
import type {
	responsiveProperties,
	unresponsiveProperties,
} from '../../styles/sprinkles.css';
import type { AtomProps } from '../../types/atoms';

interface Props
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	align?: keyof typeof responsiveProperties.styles.alignItems.values;
	justify?: keyof typeof responsiveProperties.styles.justifyContent.values;
	direction?: keyof typeof responsiveProperties.styles.flexDirection.values;
	grow?: keyof typeof unresponsiveProperties.styles.flexGrow.values;
	wrap?: keyof typeof responsiveProperties.styles.flexWrap.values;
	shrink?: keyof typeof unresponsiveProperties.styles.flexShrink.values;
}

export const Flex = forwardRef<HTMLDivElement, Props>(
	({ align, justify, direction, grow, wrap, shrink, ...restProps }, ref?) => {
		return (
			<Box
				as='div'
				display='flex'
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
