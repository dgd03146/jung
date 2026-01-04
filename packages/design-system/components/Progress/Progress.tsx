import { assignInlineVars } from '@vanilla-extract/dynamic';
import { forwardRef, type HTMLAttributes } from 'react';
import type { AtomProps } from '../../types/atoms';
import { Box } from '..';
import * as styles from './Progress.css';

export interface ProgressProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	variant?: 'primary' | 'secondary';
	percent: number;
	size?: 'sm' | 'md';
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
	({ variant, percent, size, ...restProps }, ref) => {
		return (
			<Box className={styles.track({ variant, size })} ref={ref} {...restProps}>
				<Box
					// style={{ width: `${percent}%` }}
					style={assignInlineVars({
						[styles.widthVar]: `${percent}%`,
					})}
					className={styles.thumb({ variant })}
				/>
			</Box>
		);
	},
);
