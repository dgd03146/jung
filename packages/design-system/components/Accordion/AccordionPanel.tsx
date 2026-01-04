'use client';

import { forwardRef, type HTMLAttributes, useRef } from 'react';
import type { AtomProps } from '../../types/atoms';
import { Box } from '..';
import * as styles from './Accordion.css';
import { useAccordionItemContext } from './context/AccordionItemContext';

export interface AccordionPanelProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	title?: string;
	active?: boolean;
}

export const AccordionPanel = forwardRef<HTMLDivElement, AccordionPanelProps>(
	({ children, title, active, ...restProps }: AccordionPanelProps, ref) => {
		const panelRef = useRef<HTMLDivElement>(null);
		const { index, id } = useAccordionItemContext();
		const panelId = `${id}-panel-${index}`;

		return (
			<Box
				className={styles.panel({ active })}
				ref={panelRef || ref}
				{...restProps}
				role='region'
				aria-labelledby={panelId}
				aria-hidden={!restProps['aria-expanded']}
			>
				{children}
			</Box>
		);
	},
);
