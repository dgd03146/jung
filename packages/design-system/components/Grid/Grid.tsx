import { type HTMLAttributes, forwardRef } from 'react';

import { Box } from '..';
import type { responsiveProperties } from '../../styles/sprinkles.css';
import type { AtomProps } from '../../types/atoms';

interface Props
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	rowGap?: keyof typeof responsiveProperties.styles.gridRowGap.values;
	columnGap?: keyof typeof responsiveProperties.styles.gridColumnGap.values;
	column?: keyof typeof responsiveProperties.styles.gridColumn.values;
	row?: keyof typeof responsiveProperties.styles.gridRow.values;
	autoRows?: keyof typeof responsiveProperties.styles.gridAutoRows.values;
	autoColumns?: keyof typeof responsiveProperties.styles.gridAutoColumns.values;
	templateRows?: keyof typeof responsiveProperties.styles.gridTemplateRows.values;
	templateColumns?: keyof typeof responsiveProperties.styles.gridTemplateColumns.values;
	autoFlow?: keyof typeof responsiveProperties.styles.gridAutoFlow.values;
}

export const Grid = forwardRef<HTMLDivElement, Props>(
	(
		{
			rowGap,
			columnGap,
			column,
			row,
			autoRows,
			autoColumns,
			templateRows,
			templateColumns,
			autoFlow,
			...restProps
		},
		ref?,
	) => {
		return (
			<Box
				as='div'
				display='grid'
				gridColumn={column}
				gridRow={row}
				gridColumnGap={columnGap}
				gridRowGap={rowGap}
				gridAutoColumns={autoColumns}
				gridAutoRows={autoRows}
				gridTemplateRows={templateColumns}
				gridTemplateColumns={templateColumns}
				gridAutoFlow={autoFlow}
				ref={ref}
				{...restProps}
			/>
		);
	},
);
