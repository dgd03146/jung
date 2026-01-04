import { forwardRef } from 'react';
import { Box } from '..';
import * as S from './Card.css';
import type { CardProps } from './types/card';

export interface Props extends CardProps {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
	layout?: 'vertical' | 'horizontal';
	rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
}

export const Card = forwardRef<HTMLDivElement, Props>(
	({ children, layout, variant, rounded, ...restProps }, ref) => {
		return (
			<Box
				as='div'
				className={S.card({ variant, layout, rounded })}
				ref={ref}
				{...restProps}
			>
				{children}
			</Box>
		);
	},
);
