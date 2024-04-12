import { type HTMLAttributes, forwardRef } from 'react';

import { Box, type BoxProps } from '..';
import { useCardContext } from './CardProvider';

export interface CardDateProps extends HTMLAttributes<HTMLDivElement> {}

type CardDateWithBoxProps = BoxProps<'p', CardDateProps>;
type CardDateComponent = (props: CardDateWithBoxProps) => React.ReactNode;

export const CardDate: CardDateComponent = forwardRef(
	({ ...restProps }, ref?) => {
		// FIXME: Date 함수 만들어야함
		const { date } = useCardContext();

		return (
			// FIXME: Tag로 바꿔야함
			<Box as='p' ref={ref} {...restProps}>
				{'1996-1220'}
			</Box>
		);
	},
);
