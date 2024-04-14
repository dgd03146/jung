import { type HTMLAttributes, forwardRef } from 'react';

import { Box, type BoxProps } from '..';
import { useCardContext } from './CardProvider';

export interface CardTagsProps extends HTMLAttributes<HTMLDivElement> {}

type CardTagsWithBoxProps = BoxProps<'div', CardTagsProps>;
type CardTagsComponent = (props: CardTagsWithBoxProps) => React.ReactNode;

export const CardTags: CardTagsComponent = forwardRef(
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
