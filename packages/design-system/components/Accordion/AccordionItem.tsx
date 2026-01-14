'use client';

import clsx from 'clsx';

import { forwardRef, type HTMLAttributes, useId } from 'react';
import type { AtomProps } from '../../types/atoms';
import { Box } from '..';
import * as styles from './Accordion.css';
import { AccordionItemContext } from './context/AccordionItemContext';

export interface AccordionItemProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	index?: number;
	itemId?: string;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
	(
		{ children, index, itemId, className, ...restProps }: AccordionItemProps,
		ref,
	) => {
		const generatedId = useId();
		const id = itemId ?? generatedId;

		const itemClass = clsx(styles.item, className);

		return (
			<AccordionItemContext.Provider value={{ index, id }}>
				<Box ref={ref} className={itemClass} {...restProps}>
					{children}
				</Box>
			</AccordionItemContext.Provider>
		);
	},
);
