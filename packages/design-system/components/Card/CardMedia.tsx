import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';

import { Box, type BoxProps } from '..';
import * as styles from './CardImage.css';

export interface CardMediaProps extends HTMLAttributes<HTMLDivElement> {}

type CardMediaWithBoxProps = BoxProps<'div', CardMediaProps>;
type CardMediaComponent = (props: CardMediaWithBoxProps) => ReactNode;

export const CardMedia: CardMediaComponent = forwardRef(
	({ children, ...restProps }, ref?) => {
		return (
			<Box
				as='div'
				poistion='relative'
				className={styles.wrapper}
				ref={ref}
				{...restProps}
			>
				{children}
			</Box>
		);
	},
);
