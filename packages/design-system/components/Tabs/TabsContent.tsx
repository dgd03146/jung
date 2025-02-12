import * as styles from './TabsContent.css';

import { type HTMLAttributes, forwardRef } from 'react';

import { Box } from '..';
import type { AtomProps } from '../../types/atoms';
import { useTabHandler } from './hooks/useTabHandle';

export interface TabsContentProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	value: string | number;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
	({ children, value, ...restProps }, ref?) => {
		const { isActive } = useTabHandler(value);

		if (!isActive) {
			return null;
		}

		return (
			<Box
				role='tabpanel'
				className={styles.content({ isActive })}
				ref={ref}
				{...restProps}
			>
				{children}
			</Box>
		);
	},
);
