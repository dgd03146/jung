import { type HTMLAttributes, forwardRef } from 'react';

import type { grid } from '@/tokens/index';
import { Box, type BoxProps } from '..';

interface Props extends HTMLAttributes<HTMLDivElement> {
	colStart?: keyof typeof grid.gridStartEnd;
	colEnd?: keyof typeof grid.gridStartEnd;
	rowStart?: keyof typeof grid.gridStartEnd;
	rowEnd?: keyof typeof grid.gridStartEnd;
}

type GridItemProps = BoxProps<'div', Props>;
type GridItemComponent = (props: GridItemProps) => React.ReactNode;

export const GridItem: GridItemComponent = forwardRef(
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
