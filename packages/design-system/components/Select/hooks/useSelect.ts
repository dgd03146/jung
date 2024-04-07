import { type ChangeEvent, useCallback } from "react";

import type { UseSelectParams } from "../type";

export const useSelect = <Option>({
	selectedOption,
	options,
	onChange,
}: UseSelectParams<Option>) => {
	const onChangeCallback = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			const selectedOption = options[event.currentTarget.selectedIndex];

			if (selectedOption !== undefined) {
				onChange(selectedOption);
			}
		},
		[options, onChange],
	);
	return {
		value: selectedOption && options.indexOf(selectedOption),
		options,
		onChange: onChangeCallback,
	};
};
