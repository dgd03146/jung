import { forwardRef } from 'react';
import { Box } from '..';
import { useCardContext } from './CardProvider';
import type { CardProps } from './types/card';

export interface Props extends CardProps {}

export const CardTags = forwardRef<HTMLDivElement, Props>(
	({ ...restProps }, ref?) => {
		const { tags } = useCardContext();
		return (
			<Box
				as='div'
				display='flex'
				columnGap='1'
				alignItems='center'
				ref={ref}
				{...restProps}
			>
				{/* FIXME: Change to Tag  컴포넌트 */}
				{tags.map((it, index) => (
					<p key={index}>{it}</p>
				))}
			</Box>
		);
	},
);
