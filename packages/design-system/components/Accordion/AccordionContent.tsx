import * as styles from './Accordion.css';

import { Children, type HTMLAttributes, forwardRef, useRef } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { useBeforeMatch, useCollapsibleHeight } from '@jung/shared/hooks';
import { Box } from '..';
import type { AtomProps } from '../../types/atoms';
import { useAccordionContext } from './context/AccordionContext';
import { useAccordionItemContext } from './context/AccordionItemContext';

export interface AccordionContentProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	HIDDEN?: string;
}

export const AccordionContent = forwardRef<
	HTMLDivElement,
	AccordionContentProps
>(({ className, children, ...restProps }: AccordionContentProps, ref) => {
	const { openIndexes, handleToggleIndex } = useAccordionContext();
	const { index, id } = useAccordionItemContext();
	const isOpen = openIndexes.has(index!);

	const contentRef = useRef<HTMLDivElement>(null);
	useBeforeMatch<HTMLDivElement>(contentRef, () => handleToggleIndex(index!));
	const { contentHeight } = useCollapsibleHeight<HTMLDivElement>(
		contentRef,
		isOpen,
	);

	return (
		<Box
			style={assignInlineVars({
				[styles.contentHeightVar]: `${contentHeight}px`,
			})}
			className={styles.content({ isOpen })}
			ref={contentRef || ref}
			HIDDEN={isOpen ? undefined : 'until-found'}
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
