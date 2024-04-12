import * as styles from './Badge.css';

import { type HTMLAttributes, type PropsWithChildren, forwardRef } from 'react';

import { Box, type BoxProps } from '..';

interface Props extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	rounded?: boolean;
}

type BadgeProps = BoxProps<'div', Props>;
type BadgeComponent = (props: BadgeProps) => React.ReactNode;

export const Badge: BadgeComponent = forwardRef(
	({ variant, size, rounded, children, ...restProps }, ref?) => {
		const badgeStyle = styles.badge({ variant, size, rounded });

		return (
			<Box
				as='div'
				display='inline-block'
				className={badgeStyle}
				ref={ref}
				{...restProps}
			>
				{children}
			</Box>
		);
	},
);
