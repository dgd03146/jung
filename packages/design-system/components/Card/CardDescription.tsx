import { type HTMLAttributes, forwardRef } from 'react';

import { Text } from '..';
import type { AtomProps } from '../../types/atoms';
import { useCardContext } from './CardProvider';

export interface Props
	extends Omit<HTMLAttributes<HTMLParagraphElement>, 'color'>,
		AtomProps {}

export const CardDescription = forwardRef<HTMLParagraphElement, Props>(
	({ ...restProps }, ref?) => {
		const { description } = useCardContext();

		return (
			<Text text={description} fontWeight='medium' ref={ref} {...restProps} />
		);
	},
);
