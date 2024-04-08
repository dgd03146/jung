"use client";

import { Select } from "@jung/design-system";
import { useState } from "react";

// const options = [
//   { label: 'Option1', value: 'option1' },
//   { label: 'Option2', value: 'option2' },
//   { label: 'Option3', value: 'option3' },
// ];

const SelectComponent = () => {
	const [value, setValue] = useState<string>("");
	const onChange = (value: string) => {
		setValue(value);
	};

	console.log(value, "selectComponent Value");

	return (
		<>
			<h1>Selelcted Value: {value}</h1>
			<Select defaultValue="option1" onValueChange={onChange}>
				<Select.Label>Label</Select.Label>
				<Select.Trigger placeholder="Select Option" />
				<Select.Menu>
					<Select.Item value="option1">Option1</Select.Item>
					<Select.Item value="option2">Option2</Select.Item>
					<Select.Item value="option3">Option3</Select.Item>
				</Select.Menu>
			</Select>
		</>
	);
};

export default SelectComponent;
