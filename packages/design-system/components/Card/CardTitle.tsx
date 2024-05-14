import { type HTMLAttributes, forwardRef } from 'react';
import { Text } from '..';
import type { AtomProps } from '../../types/atoms';
import { useCardContext } from './CardProvider';

export interface Props
	extends Omit<HTMLAttributes<HTMLParagraphElement>, 'color'>,
		AtomProps {}

export const CardTitle = forwardRef<HTMLParagraphElement, Props>(
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
