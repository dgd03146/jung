import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox, type CheckboxProps } from '@jung/design-system';
import { useState } from 'react';

const meta = {
	title: 'COMPONENTS/Checkbox',
	component: Checkbox,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],

	argTypes: {
		disabled: {
			options: [true, false],
			control: { type: 'select' },
		},
	},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

const Template = (props: CheckboxProps) => {
	const [checked, setChecked] = useState(false);
	const handleChecked = () => {
		setChecked(!checked);
	};

	return (
		<Checkbox checked={checked} onChange={handleChecked} {...props}>
			Checkbox
		</Checkbox>
	);
};

export const Default: Story = {
	render: (args) => <Template {...args} />,
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
	render: (args) => <Template {...args} />,
};
