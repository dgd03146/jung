import type { ButtonComponent } from "components/Button/Button";
import { forwardRef, useEffect } from "react";
import { type BoxProps, Button } from "..";
import { SelectorIcon } from "../Icons/SelectorIcon";
import { useSelectContext } from "./SelectProvider";

export const SelectTrigger: ButtonComponent = forwardRef(
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

		return (
			<Button
				role="button"
				aria-controls="listbox"
				aria-expanded={open}
				aria-haspopup="listbox"
				aria-labelledby="label"
				display="flex"
				disabled={disabled}
				color={disabled ? "primary100" : "primary"}
				cursor={disabled ? "default" : "pointer"}
				justifyContent="space-between"
				columnGap="8"
				fontSize="sm"
				whiteSpace="nowrap"
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
