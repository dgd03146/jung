import * as styles from './Accordion.css';

import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { KeyboardArrowUp } from '../../icons';

import { Box, Stack } from '..';
import type { AtomProps } from '../../types';

import { useAccordionContext } from './context/AccordionContext';
import { useAccordionItemContext } from './context/AccordionItemContext';

export interface AccordionTriggerProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		Omit<AtomProps, 'top'> {
	top?: ReactNode;
	hasPanel?: boolean;
	active?: boolean;
}

export const AccordionTrigger = forwardRef<
	HTMLDivElement,
	AccordionTriggerProps
>(
	(
		{
			children,
			top,
			hasPanel = true,
			active = false,
			...restProps
		}: AccordionTriggerProps,
		ref,
	) => {
		const { openIndexes, handleToggleIndex, setAnimationEnabled } =
			useAccordionContext();

		const { index, id } = useAccordionItemContext();

		const isValidIndex = typeof index === 'number';
		const isOpen =
			isValidIndex && openIndexes instanceof Set && openIndexes.has(index);

		const handleClick = () => {
			if (!isValidIndex) return;
			setAnimationEnabled(true);
			handleToggleIndex(index);
		};

		return (
			<Box
				ref={ref}
				className={styles.trigger({ active })}
				onClick={handleClick}
				role='button'
				id={id}
				aria-expanded={isOpen ? 'true' : 'false'}
				aria-controls={id}
				{...restProps}
			>
				<Stack space='0' rowGap='5' align={'left'}>
					{top && top}

					{children}
				</Stack>
				{hasPanel && (
					<Box className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
						<KeyboardArrowUp />
					</Box>
				)}
			</Box>
		);
	},
);
