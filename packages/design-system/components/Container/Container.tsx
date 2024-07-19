import { type HTMLAttributes, forwardRef } from 'react';

import { Box } from '..';
import type { AtomProps } from '../../types/atoms';

interface Props
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	centerContent?: boolean;
}

export const Container = forwardRef<HTMLDivElement, Props>(
	({ centerContent, width, maxWidth, ...restProps }, ref) => {
		const display = centerContent ? 'flex' : 'block';
		const alignItems = centerContent ? 'center' : 'stretch';
		const flexDirection = centerContent ? 'column' : 'row';

		return (
			<Box
				as='div'
				width={width || 'full'}
				maxWidth={maxWidth || 'full'}
				display={display}
				alignItems={alignItems}
				flexDirection={flexDirection}
				ref={ref}
				{...restProps}
			/>
		);
	},
);
