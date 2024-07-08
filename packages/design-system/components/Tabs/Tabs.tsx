'use client';

import { type HTMLAttributes, forwardRef, useMemo, useState } from 'react';

import { Box } from '..';
import type { AtomProps } from '../../types/atoms';
import { TabsContext } from './context/TabsContext';

export interface TabsProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	defaultValue?: string | number;
	variant?: 'primary' | 'secondary';
	rounded?: boolean;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
	(
		{
			children,
			variant = 'primary',
			rounded = false,
			defaultValue,
			...restProps
		},
		ref,
	) => {
		const [currentTab, setCurrentTab] = useState(defaultValue);

		const value = useMemo(
			() => ({
				currentTab,
				setCurrentTab,
				variant,
				rounded,
			}),
			[currentTab, variant, rounded],
		);

		return (
			<TabsContext.Provider value={value}>
				<Box ref={ref} {...restProps}>
					{children}
				</Box>
			</TabsContext.Provider>
		);
	},
);
