'use client';

import { forwardRef, type LiHTMLAttributes, useEffect, useRef } from 'react';
import { CheckIcon } from '../../icons';
import type { AtomProps } from '../../types/atoms';
import { Box } from '..';
import { useSelectContext } from './context/SelectProvider';
import { useSelect } from './hooks/useSelect';
import * as styles from './SelectItem.css';

export interface Props
	extends Omit<LiHTMLAttributes<HTMLLIElement>, 'color'>,
		AtomProps {
	value: string;
	disabled?: boolean;
}

export const SelectItem = forwardRef<HTMLLIElement, Props>(
	({ children, id, value, disabled, ...restProps }, ref) => {
		const {
			selectedOption,
			setOpen,
			onValueChange,
			setSelectedOption,
			setOptions,
			defaultValue,
		} = useSelectContext();

		const { getChildText } = useSelect();
		const childText = getChildText(children);
		const optionRef = useRef<HTMLLIElement>(null);
		const optionValue = {
			label: childText,
			value,
			isDisabled: !!disabled,
		};

		const selectedOptionItem = defaultValue === value;

		useEffect(() => {
			setOptions((prev) => [...prev, optionValue]);
			if (selectedOptionItem) {
				optionRef.current?.focus();
			}
		}, []);

		useEffect(() => {
			if (selectedOption.value === value) {
				optionRef.current?.focus();
			}
		}, [open]);

		return (
			<Box
				as='li'
				role='option'
				aria-selected={value === selectedOption?.value}
				data-disabled={disabled}
				tabIndex={0}
				display='flex'
				justifyContent='space-between'
				color='white'
				paddingX='2.5'
				paddingY='1.5'
				fontSize='sm'
				minWidth='40'
				cursor='pointer'
				id={id}
				ref={optionRef || ref}
				className={styles.li}
				background={value === selectedOption?.value ? 'primary' : 'transparent'}
				{...restProps}
				onFocus={() => {
					if (optionRef.current) {
						optionRef.current.dataset.focus = 'focus';
					}
				}}
				onBlur={() => {
					if (optionRef.current) {
						optionRef.current.dataset.focus = '';
					}
				}}
				onMouseEnter={() => {
					optionRef.current?.focus();
				}}
				onClick={() => {
					if (!disabled && onValueChange) {
						setSelectedOption({
							value,
							label: childText,
							isDisabled: !!disabled,
						});
						setOpen(false);

						onValueChange(value);
					}
				}}
			>
				<span>{childText}</span>
				{value === selectedOption?.value && <CheckIcon />}
			</Box>
		);
	},
);
