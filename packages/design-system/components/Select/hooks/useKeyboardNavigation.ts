import { useSelectContext } from '../SelectProvider';

type Option = {
	value: string;
	label: string;
	isDisabled: boolean;
};

export const useKeyboardNavigation = (selectedOptionValue: Option) => {
	const { setOpen, onValueChange, setSelectedOption } = useSelectContext();

	const handleKeyDown = (e: React.KeyboardEvent) => {
		// const selectOptions = selectRef?.current?.querySelectorAll(
		// 	'[role="option"]:not([data-disabled="true"])',
		// ) as NodeListOf<HTMLLIElement>;

		switch (e.key) {
			case 'ArrowUp':
				// ArrowUp 키에 대한 처리
				console.log('arrow up');
				break;
			case 'ArrowDown':
				// ArrowDown 키에 대한 처리
				break;
			case 'Enter':
				console.log('enter 되는중');

				if (onValueChange) {
					setSelectedOption(selectedOptionValue);
					onValueChange(selectedOptionValue.value);
				}
				setOpen(false);
				// Enter 키에 대한 처리
				break;
			case 'Escape':
				// Escape 키에 대한 처리
				setOpen(false);
				break;
			default:
				// 다른 키에 대한 처리
				break;
		}
	};
	return { handleKeyDown };
};
