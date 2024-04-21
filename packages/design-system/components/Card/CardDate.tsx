import { type HTMLAttributes, forwardRef } from 'react';
import { Text } from '..';
import type { BoxProps } from '..';
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
			<Text text={'1996-1220 날짜 예시'} />
		);
	},
);
