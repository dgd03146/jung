import * as S from './Card.css';

import { forwardRef } from 'react';
import { Box } from '..';
import type { CardProps } from './types/card';

export interface Props extends CardProps {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
	layout?: 'vertical' | 'horizontal';
}

export const Card = forwardRef<HTMLDivElement, Props>(
	({ children, layout, variant, ...restProps }, ref) => {
		return (
			<Box
				as='div'
				className={S.card({ variant, layout })}
				ref={ref}
				{...restProps}
			>
				{children}
			</Box>
		);
	},
);
