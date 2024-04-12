import type { space } from '@/tokens/space';
import { Children, type ReactNode, forwardRef } from 'react';
import { Box, type BoxProps } from '..';
import { mapResponsiveValue } from '../../styles/sprinkles.css';

const alignToFlexAlign = {
	left: 'flex-start',
	center: 'center',
	right: 'flex-end',
} as const;

type Props = {
	children?: ReactNode;
	space: keyof typeof space;
	align: keyof typeof alignToFlexAlign;
};

type StackProps = BoxProps<'div', Props>;

type StackComponent = (props: StackProps) => React.ReactNode;

export const Stack: StackComponent = forwardRef(
	({ children, space, align, ...restProps }, ref?) => {
		const stackItems = Children.toArray(children);
		const alignItems = align
			? mapResponsiveValue(align, (value) => alignToFlexAlign[value])
			: undefined;

		return (
			<Box
				display='flex'
				flexDirection='column'
				alignItems={alignItems}
				paddingBottom={space}
				ref={ref}
				{...restProps}
			>
				{stackItems.map((item, index) => (
					<Box
						key={index}
						paddingBottom={index !== stackItems.length - 1 ? space : undefined}
					>
						{item}
					</Box>
				))}
			</Box>
		);
	},
);
