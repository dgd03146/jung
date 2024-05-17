import { type HTMLAttributes, forwardRef } from 'react';
import { Box } from '..';
import type { AtomProps } from '../../types/atoms';
import * as S from './Typography.css';

/**
 * Typography FootNote Note
 * @param {number} FootNote - FootNote note level value
 * - level `1`: FootNote 1
 * - level `2`: FootNote 2
 * - level `3`: FootNote 3
 */

export interface FootNoteProps
	extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'>,
		AtomProps {
	level?: 1 | 2 | 3;
}

export const FootNote = forwardRef<HTMLParagraphElement, FootNoteProps>(
	({ level = 1, children, ...restProps }, ref) => {
		return (
			<Box as='span' className={S.footNote({ level })} ref={ref} {...restProps}>
				{children}
			</Box>
		);
	},
);
