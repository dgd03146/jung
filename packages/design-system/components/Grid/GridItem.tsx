import { type HTMLAttributes, forwardRef } from 'react';

import { Box } from '..';
import type { grid } from '../../tokens';
import type { AtomProps } from '../../types/atoms';

interface Props
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	colStart?: keyof typeof grid.gridStartEnd;
	colEnd?: keyof typeof grid.gridStartEnd;
	rowStart?: keyof typeof grid.gridStartEnd;
	rowEnd?: keyof typeof grid.gridStartEnd;
}

export const GridItem = forwardRef<HTMLDivElement, Props>(
	({ colStart, colEnd, rowStart, rowEnd, ...restProps }, ref?) => {
		return (
			<Box
				as='div'
				gridColumnStart={colStart}
				gridColumnEnd={colEnd}
				gridRowStart={rowStart}
				gridRowEnd={rowEnd}
				ref={ref}
				{...restProps}
			/>
		);
	},
);
