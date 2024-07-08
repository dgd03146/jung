'use client';

import { type HTMLAttributes, forwardRef, useRef } from 'react';

import { Box } from '..';
import type { AtomProps } from '../../types/atoms';
import { Typography } from '../Typography';
import { useAccordionItemContext } from './context/AccordionItemContext';

export interface AccordionPanelProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	title?: string;
}

export const AccordionPanel = forwardRef<HTMLDivElement, AccordionPanelProps>(
	({ children, title, ...restProps }: AccordionPanelProps, ref) => {
		const panelRef = useRef<HTMLDivElement>(null);
		const { index, id } = useAccordionItemContext();
		const panelId = `${id}-panel-${index}`;

		return (
			<Box
				ref={panelRef || ref}
				{...restProps}
				role='region'
				aria-labelledby={panelId}
				aria-hidden={!restProps['aria-expanded']}
			>
				{title && <Typography.Text marginBottom='4'>{title}</Typography.Text>}
				<Typography.Text level={2} marginBottom='4'>
					{children}
				</Typography.Text>
			</Box>
		);
	},
);
