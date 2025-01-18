import * as styles from './Accordion.css';

import { type HTMLAttributes, forwardRef, useId } from 'react';

import clsx from 'clsx';
import { Box } from '..';
import type { AtomProps } from '../../types/atoms';
import { AccordionItemContext } from './context/AccordionItemContext';

export interface AccordionItemProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	index?: number;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
	({ children, index, className, ...restProps }: AccordionItemProps, ref) => {
		const id = useId();

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
