import { type HTMLAttributes, forwardRef } from 'react';

import { Box, type BoxProps } from '..';
import { useCardContext } from './CardProvider';

export interface CardTitleProps extends HTMLAttributes<HTMLHeadElement> {}

type CardTitleWithBoxProps = BoxProps<'h1', CardTitleProps>;
type CardTitleComponent = (props: CardTitleWithBoxProps) => React.ReactNode;

export const CardTitle: CardTitleComponent = forwardRef(
	({ ...restProps }, ref?) => {
		const { title } = useCardContext();

		return (
			// FIXME: Need to change typography component
			<Box as='h1' ref={ref} {...restProps}>
				{title}
			</Box>
		);
	},
);
