'use client';

import {
	Children,
	type HTMLAttributes,
	forwardRef,
	isValidElement,
	useEffect,
} from 'react';

import { Box } from '..';
import type { AtomProps } from '../../types/atoms';
import { useTabsContext } from './context/TabsContext';

export interface TabsListProps
	extends Omit<HTMLAttributes<HTMLUListElement>, 'color'>,
		AtomProps {}

export const TabsList = forwardRef<HTMLUListElement, TabsListProps>(
	({ children, ...restProps }, ref?) => {
		const { currentTab, setCurrentTab, variant } = useTabsContext();

		useEffect(() => {
			if (currentTab === undefined) {
				const firstChild = Children.toArray(children)[0];
				if (isValidElement(firstChild) && firstChild.props.value) {
					setCurrentTab(firstChild.props.value);
				}
			}
		}, [currentTab, children, setCurrentTab]);

		return (
			<Box
				as='ul'
				role='tablist'
				display='flex'
				alignItems='center'
				columnGap={variant === 'primary' ? '4' : '0'}
				ref={ref}
				{...restProps}
			>
				{children}
			</Box>
		);
	},
);
