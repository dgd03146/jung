import * as styles from './Accordion.css';

import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { KeyboardArrowUp } from '../../icons';

import { Box, Stack, Typography } from '..';
import type { AtomProps } from '../../types';

import { useAccordionContext } from './context/AccordionContext';
import { useAccordionItemContext } from './context/AccordionItemContext';

export interface AccordionTriggerProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		Omit<AtomProps, 'top'> {
	top?: ReactNode;
}

export const AccordionTrigger = forwardRef<
	HTMLDivElement,
	AccordionTriggerProps
>(({ children, top, ...restProps }: AccordionTriggerProps, ref) => {
	const { openIndexes, handleToggleIndex } = useAccordionContext();
	const { index, id } = useAccordionItemContext();
	const isOpen = openIndexes.has(index!);

	return (
		<Box
			ref={ref}
			className={styles.trigger}
			onClick={() => handleToggleIndex(index!)}
			role='button'
			id={id}
			aria-expanded={isOpen ? 'true' : 'false'}
			aria-controls={id}
			{...restProps}
		>
			<Stack space='5' align={'left'}>
				{top && top}
				<Typography.Text>{children}</Typography.Text>
			</Stack>
			<Box className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
				<KeyboardArrowUp />
			</Box>
		</Box>
	);
});
