import {
	Children,
	type HTMLAttributes,
	type ReactElement,
	cloneElement,
	forwardRef,
	isValidElement,
} from 'react';

import { Box } from '..';
import type { AtomProps } from '../../types/atoms';
import { AccordionContext } from './context/AccordionContext';
import { useAccordion } from './hooks/useAccordion';

export interface AccordionProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	type?: 'single' | 'multiple';
	initialOpenIndex?: number;
	storageKey?: string;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
	(
		{
			type = 'single',
			initialOpenIndex,
			storageKey,
			children,
			...restProps
		}: AccordionProps,
		ref,
	) => {
		const { value } = useAccordion({ type, initialOpenIndex, storageKey });

		return (
			<AccordionContext.Provider value={value}>
				<Box
					ref={ref}
					display='flex'
					flexDirection='column'
					// rowGap='4'
					{...restProps}
				>
					{Children.map(children, (child, index) =>
						isValidElement(child)
							? cloneElement(child as ReactElement, { index: index + 1 })
							: child,
					)}
				</Box>
			</AccordionContext.Provider>
		);
	},
);
