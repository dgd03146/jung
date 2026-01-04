import { forwardRef, type HTMLAttributes } from 'react';
import type { AtomProps } from '../../types/atoms';
import { Box } from '..';
import * as S from './Typography.css';

type FootNoteElement = 'p' | 'span' | 'label' | 'time';

/**
 * Typography FootNote Note
 * @param {number} FootNote - FootNote note level value
 * - level `1`: FootNote 1
 * - level `2`: FootNote 2
 * - level `3`: FootNote 3
 */

export interface FootNoteProps
	extends Omit<HTMLAttributes<HTMLElement>, 'color'>,
		AtomProps {
	level?: 1 | 2 | 3;
	as?: FootNoteElement;
}

export const FootNote = forwardRef<HTMLElement, FootNoteProps>(
	({ level = 1, children, as = 'span', ...restProps }, ref) => {
		return (
			<Box as={as} className={S.footNote({ level })} ref={ref} {...restProps}>
				{children}
			</Box>
		);
	},
);
