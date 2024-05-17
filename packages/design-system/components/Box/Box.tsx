import {
	type ElementType,
	type HTMLAttributes,
	type ReactNode,
	forwardRef,
} from 'react';
import type { Atoms } from '../../types/atoms';
import type { PolymorphicComponentPropWithRef } from '../../types/polymorhpic';
import { atoms, extractAtoms } from '../../utils/atoms';

type HTMLProperties = Omit<
	HTMLAttributes<HTMLElement>,
	'className' | 'color' | 'height' | 'width' | 'size'
>;

export type BoxProps<C extends ElementType = 'div'> =
	PolymorphicComponentPropWithRef<C, HTMLProperties & Atoms>;

type BoxComponent = <C extends ElementType = 'div'>(
	props: BoxProps<C>,
) => ReactNode;

export const Box: BoxComponent = forwardRef<HTMLElement, BoxProps<ElementType>>(
	({ as, ...restProps }, ref) => {
		const [atomsProps, propsToForward] = extractAtoms(restProps);
		const Component: ElementType = as || 'div';
		const className = atoms({
			className: propsToForward?.className,
			reset: typeof Component === 'string' ? Component : 'div',
			...atomsProps,
		});

		return <Component {...propsToForward} className={className} ref={ref} />;
	},
);
