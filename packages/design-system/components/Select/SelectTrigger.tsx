import type { ButtonComponent } from "components/Button/Button";
import { forwardRef } from "react";
import { type BoxProps, Button } from "..";
import { SelectorIcon } from "../Icons/SelectorIcon";
import { useSelectContext } from "./SelectProvider";

export const SelectTrigger: ButtonComponent = forwardRef(
	({ children, disabled, ...restProps }, ref?) => {
		const { open, setOpen, defaultValue } = useSelectContext();
		//   value가 있으면 value 없으면 defaultValue

		const selectedOption = { label: "Option3", value: "option3" };
		// type Option |null ex) { label: 'Option3', value: 'option3' }

		// TODO: disabled일 때 버튼 hover 안되게 스타일 변경
		// TODO: invalid일때도?

		return (
			<Button
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
				onClick={() => setOpen((prev) => !prev)}
			>
				{/* TODO: span 타이포그래피 만들기 */}
				<span>{!selectedOption ? defaultValue : selectedOption.label}</span>
				{children}
			</Button>
		);
	},
);
