import { type ButtonHTMLAttributes, forwardRef } from 'react';

import { Button } from '..';
import { SelectorIcon } from '../../icons';
import type { AtomProps } from '../../types/atoms';
import { useSelectContext } from './SelectProvider';

export interface Props
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'prefix' | 'color'>,
		AtomProps {
	placeholder?: string;
}

export const SelectTrigger = forwardRef<HTMLButtonElement, Props>(
	({ children, disabled, placeholder, ...restProps }, ref?) => {
		const { open, setOpen, selectedOption, setSelectedOption, defaultValue } =
			useSelectContext();
		//   value가 있으면 value 없으면 defaultValue

		// TODO: disabled일 때 버튼 hover 안되게 스타일 변경
		// TODO: invalid일때도?

		// useEffect(() => {
		//   setSelectedOption({
		//     value: defaultValue ?? '',
		//     label: '',
		//     isDisabled: false,
		//   });
		// }, []);

		console.log('🚀 ~ selectedOption.label:', selectedOption.label);

		return (
			<Button
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
				// columnGap="8"
				size='sm'
				fontSize='sm'
				minWidth='40'
				whiteSpace='nowrap'
				caretColor='transparent'
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
				{/* defaultValue가 만약에 있으면???... defaultValue의 label을 보여줘야하잖아?? */}

				<label>{selectedOption.label || placeholder}</label>
				{children}
			</Button>
		);
	},
);
