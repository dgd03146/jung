import * as styles from './AccordionItem.css';

import { type HTMLAttributes, forwardRef, useId } from 'react';

import { Box } from '..';
import type { AtomProps } from '../../types/atoms';
import { AccordionItemContext } from './context/AccordionItemContext';

export interface AccordionItemProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	index?: number;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
	({ children, index, ...restProps }: AccordionItemProps, ref) => {
		const id = useId();

		return (
			<AccordionItemContext.Provider value={{ index, id }}>
				<Box ref={ref} className={styles.item} {...restProps}>
					{children}
				</Box>
			</AccordionItemContext.Provider>
		);
	},
);
