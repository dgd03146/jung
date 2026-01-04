import { forwardRef, type HTMLAttributes } from 'react';
import type { AtomProps } from '../../types/atoms';

import { Box } from '..';
import { useTabHandler } from './hooks/useTabHandle';
import * as styles from './TabsContent.css';

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
