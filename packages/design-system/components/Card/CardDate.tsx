import { forwardRef } from 'react';
import { Text } from '..';
import { useCardContext } from './CardProvider';
import type { CardProps } from './types/card';

export interface Props extends CardProps {}

export const CardDate = forwardRef<HTMLDivElement, Props>(
	({ ...restProps }, ref?) => {
		// FIXME: Date 함수 만들어야함
		const { date } = useCardContext();

		return (
			// FIXME: Tag로 바꿔야함
			<Text text={'1996-1220 날짜 예시'} />
		);
	},
);
