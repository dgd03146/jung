import { type HTMLAttributes, forwardRef } from 'react';

import { type BoxProps, Text } from '..';
import { useCardContext } from './CardProvider';

export interface CardTitleProps extends HTMLAttributes<HTMLParagraphElement> {}

type CardTitleWithBoxProps = BoxProps<'p', CardTitleProps>;
type CardTitleComponent = (props: CardTitleWithBoxProps) => React.ReactNode;

export const CardTitle: CardTitleComponent = forwardRef(
	({ ...restProps }, ref?) => {
		const { title } = useCardContext();

		return (
			<Text
				text={title}
				fontSize='lg'
				fontWeight='semibold'
				ref={ref}
				{...restProps}
			/>
		);
	},
);
