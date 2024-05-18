import * as S from './AccordionTrigger.css';

import { KeyboardArrowDown, KeyboardArrowUp } from '@/icons';
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';

import { Box, Stack, Typography } from '@/components';
import type { AtomProps } from '@/types';
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
			className={S.trigger}
			onClick={() => handleToggleIndex(index!)}
			role='button'
			id={id}
			aria-expanded={isOpen}
			aria-controls={id}
			{...restProps}
		>
			<Stack space='5' align={'left'}>
				{top && top}
				<Typography.Text>{children}</Typography.Text>
			</Stack>
			<Box className={S.arrow}>
				{isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
			</Box>
		</Box>
	);
});
