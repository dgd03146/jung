import { forwardRef } from 'react';
import { Box } from '..';
import * as styles from './Card.css';
import type { CardProps } from './types/card';

export interface Props extends CardProps {}

export const CardContent = forwardRef<HTMLDivElement, Props>(
	({ children, ...restProps }, ref?) => {
		return (
			<Box
				as='div'
				display='flex'
				flexDirection='column'
				flexGrow={1}
				rowGap='1'
				padding='2.5'
				className={styles.textContainer}
				ref={ref}
				{...restProps}
			>
				{children}
			</Box>
		);
	},
);
