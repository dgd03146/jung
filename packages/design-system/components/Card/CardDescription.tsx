import { type BoxProps, Text } from '..';

import { type HTMLAttributes, forwardRef } from 'react';
import { useCardContext } from './CardProvider';

export interface CardDescriptionProps
	extends HTMLAttributes<HTMLParagraphElement> {}

type CardDescriptionWithBoxProps = BoxProps<'p', CardDescriptionProps>;
type CardDescriptionComponent = (
	props: CardDescriptionWithBoxProps,
) => React.ReactNode;

export const CardDescription: CardDescriptionComponent = forwardRef(
	({ ...restProps }, ref?) => {
		const { description } = useCardContext();

		return (
			<Text text={description} fontWeight='medium' ref={ref} {...restProps} />
		);
	},
);
