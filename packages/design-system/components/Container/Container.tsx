import { type HTMLAttributes, forwardRef } from 'react';

import { Box, type BoxProps } from '..';

interface Props extends HTMLAttributes<HTMLDivElement> {
	centerContent?: boolean;
}

type ContainerProps = BoxProps<'div', Props>;
type ContainerComponent = (props: ContainerProps) => React.ReactNode;

export const Container: ContainerComponent = forwardRef(
	({ centerContent, ...restProps }, ref?) => {
		const display = centerContent ? 'flex' : 'block';
		const alignItems = centerContent ? 'center' : 'stretch';
		const flexDirection = centerContent ? 'column' : 'row';

		return (
			<Box
				as='div'
				display={display}
				alignItems={alignItems}
				flexDirection={flexDirection}
				ref={ref}
				{...restProps}
			/>
		);
	},
);
