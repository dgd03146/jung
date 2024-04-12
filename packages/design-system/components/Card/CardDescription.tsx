import { type HTMLAttributes, forwardRef } from 'react';

import { Box, type BoxProps } from '..';
import { useCardContext } from './CardProvider';

export interface CardDescriptionProps extends HTMLAttributes<HTMLHeadElement> {}

type CardDescriptionWithBoxProps = BoxProps<'h2', CardDescriptionProps>;
type CardDescription = (props: CardDescriptionWithBoxProps) => React.ReactNode;

export const CardDescription: CardDescription = forwardRef(
	({ ...restProps }, ref?) => {
		const { description } = useCardContext();

		return (
			// FIXME: Need to change typography component
			<Box as='h2' ref={ref} {...restProps}>
				{description}
			</Box>
		);
	},
);
