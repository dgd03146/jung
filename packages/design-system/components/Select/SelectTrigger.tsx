import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { SelectorIcon } from '../../icons';
import type { AtomProps } from '../../types/atoms';
import { Button } from '..';
import { useSelectContext } from './context/SelectProvider';

import * as styles from './SelectTrigger.css';

export interface Props
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'prefix' | 'color'>,
		AtomProps {
	placeholder?: string;
}

export const SelectTrigger = forwardRef<HTMLButtonElement, Props>(
	({ children, disabled, placeholder, ...restProps }, ref?) => {
		const { open, setOpen, selectedOption, defaultValue } = useSelectContext();

		return (
			<Button
				className={styles.trigger}
				role='button'
				aria-controls='listbox'
				aria-expanded={open}
				aria-haspopup='listbox'
				aria-labelledby='label'
				disabled={disabled}
				color={disabled ? 'primary100' : 'primary'}
				cursor={disabled ? 'default' : 'pointer'}
				display='flex'
				justifyContent='space-between'
				background='transparent'
				borderColor='primary'
				borderWidth='hairline'
				borderStyle='solid'
				size='sm'
				fontSize='sm'
				minWidth='40'
				ref={ref}
				{...restProps}
				suffix={<SelectorIcon />}
				onClick={(e) => {
					if (!disabled) {
						setOpen((prev) => !prev);
						e.preventDefault();
					}
				}}
			>
				<span>
					{defaultValue ? defaultValue : selectedOption.label || placeholder}
				</span>
				{children}
			</Button>
		);
	},
);
