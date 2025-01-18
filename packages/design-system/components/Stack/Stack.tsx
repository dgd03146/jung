import {
	Children,
	type HTMLAttributes,
	type ReactNode,
	forwardRef,
} from 'react';
import { Box } from '..';
import { mapResponsiveValue } from '../../styles/sprinkles.css';
import type { space } from '../../tokens/space';
import type { AtomProps } from '../../types/atoms';

const alignToFlexAlign = {
	left: 'flex-start',
	center: 'center',
	right: 'flex-end',
} as const;

interface Props
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	children?: ReactNode;
	space?: keyof typeof space;
	align?: keyof typeof alignToFlexAlign;
}

export const Stack = forwardRef<HTMLDivElement, Props>(
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
				paddingBottom={space || '0'}
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
