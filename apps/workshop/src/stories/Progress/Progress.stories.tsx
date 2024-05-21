import type { Meta, StoryObj } from '@storybook/react';

import { Box, Progress, type ProgressProps, Stack } from '@jung/design-system';

type Variant = 'primary' | 'secondary';
const variantOptions: Variant[] = ['primary', 'secondary'];

type Size = 'sm' | 'md';
const sizeOptions: Size[] = ['sm', 'md'];

const meta = {
	title: 'COMPONENTS/Progress',
	component: Progress,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],

	argTypes: {
		variant: {
			options: variantOptions,
			control: { type: 'select' },
		},
		size: {
			options: sizeOptions,
			control: { type: 'select' },
		},
	},
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof Progress>;

const Template = (args: ProgressProps) => (
	<Box width='mobile'>
		<Progress {...args} />
	</Box>
);

export const Variants: Story = {
	render: (args) => (
		<Stack space='8' align='center'>
			{variantOptions.map((variant) => (
				<Template {...args} key={variant} variant={variant} percent={30} />
			))}
		</Stack>
	),
};

export const Size: Story = {
	render: (args) => (
		<Stack space='8' align='center'>
			{sizeOptions.map((size) => (
				<Template {...args} key={size} size={size} percent={30} />
			))}
		</Stack>
	),
};
