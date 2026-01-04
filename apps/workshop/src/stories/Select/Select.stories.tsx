import { Select, type SelectProps } from '@jung/design-system';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta: Meta<typeof Select> = {
	title: 'COMPONENTS/Select',
	component: Select,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

const Template = (props: SelectProps) => {
	const [value, setValue] = useState<string>('');

	const onChange = (newValue: string) => {
		setValue(newValue);
	};

	return (
		<Select defaultValue='option1' onValueChange={onChange} {...props}>
			<Select.Label>{value}</Select.Label>
			<Select.Trigger placeholder='Select Option' />
			<Select.Menu>
				<Select.Item value='option1'>Option1</Select.Item>
				<Select.Item value='option2'>Option2</Select.Item>
				<Select.Item value='option3'>Option3</Select.Item>
			</Select.Menu>
		</Select>
	);
};

export const Default: Story = {
	render: (args) => <Template {...args} />,
};
