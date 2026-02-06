'use client';

import { useBeforeMatch, useCollapsibleHeight } from '@jung/shared/hooks';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { Children, forwardRef, type HTMLAttributes, useRef } from 'react';
import type { AtomProps } from '../../types/atoms';
import { Box } from '..';
import * as styles from './Accordion.css';
import { useAccordionContext } from './context/AccordionContext';
import { useAccordionItemContext } from './context/AccordionItemContext';
import { isAccordionItemOpen } from './utils';

export interface AccordionContentProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	HIDDEN?: string;
}

export const AccordionContent = forwardRef<
	HTMLDivElement,
	AccordionContentProps
>(({ className, children, ...restProps }: AccordionContentProps, ref) => {
	const { openIndexes, handleToggleIndex, animationEnabled } =
		useAccordionContext();
	const { index, id } = useAccordionItemContext();
	const isOpen = isAccordionItemOpen(index, openIndexes);

	const contentRef = useRef<HTMLDivElement>(null);
	useBeforeMatch<HTMLDivElement>(contentRef, () => handleToggleIndex(index!));
	const { contentHeight } = useCollapsibleHeight<HTMLDivElement>(
		contentRef,
		isOpen,
	);

	const contentClass = animationEnabled
		? styles.content({ isOpen })
		: styles.contentNoAnimation({ isOpen });

	return (
		<Box
			style={assignInlineVars({
				[styles.contentHeightVar]: `${contentHeight}px`,
			})}
			className={contentClass}
			ref={contentRef || ref}
			// HIDDEN={isOpen ? undefined : 'until-found'}
			role='region'
			aria-labelledby={id}
			tabIndex={isOpen ? 0 : -1}
			id={`${id}-content`}
			data-testid={`accordion-content-${index}`}
			{...restProps}
		>
			{Children.map(children, (child, index) => (
				<Box key={index} className={styles.contentChild}>
					{child}
				</Box>
			))}
		</Box>
	);
});
