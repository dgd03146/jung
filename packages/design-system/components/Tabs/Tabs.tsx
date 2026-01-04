'use client';

import {
	forwardRef,
	type HTMLAttributes,
	useCallback,
	useMemo,
	useState,
} from 'react';
import type { AtomProps } from '../../types/atoms';
import { Box } from '..';
import { TabsContext } from './context/TabsContext';

export interface TabsProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {
	value?: string | number;
	defaultValue?: string | number;
	onValueChange?: (value: string | number) => void;
	variant?: 'primary' | 'secondary';
	rounded?: boolean;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
	(
		{
			children,
			value,
			defaultValue,
			onValueChange,
			variant = 'primary',
			rounded = false,
			...restProps
		},
		ref,
	) => {
		const [internalValue, setInternalValue] = useState(defaultValue);
		const currentTab = value ?? internalValue;

		const handleValueChange = useCallback(
			(newValue: string | number) => {
				if (value === undefined) {
					setInternalValue(newValue);
				}
				onValueChange?.(newValue);
			},
			[value, onValueChange],
		);

		const contextValue = useMemo(
			() => ({
				currentTab,
				setCurrentTab: handleValueChange,
				variant,
				rounded,
			}),
			[currentTab, handleValueChange, variant, rounded],
		);

		return (
			<TabsContext.Provider value={contextValue}>
				<Box ref={ref} {...restProps}>
					{children}
				</Box>
			</TabsContext.Provider>
		);
	},
);
