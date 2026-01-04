import { Flex, Input, type InputProps } from '@jung/design-system';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { sizeOptions, variantOptions } from './options';

const meta = {
	title: 'COMPONENTS/Input',
	component: Input,
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
		// rounded: {
		// 	options: [true, false],
		// 	control: { type: 'select' },
		// },

		disabled: {
			options: [true, false],
			control: { type: 'select' },
		},
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

const Template = (args: InputProps) => (
	<Input size='sm' {...args} placeholder='Enter...' />
);

export const Variants: Story = {
	render: (args) => (
		<Flex columnGap='4'>
			{variantOptions.map((variant) => (
				<Template {...args} key={variant} variant={variant} />
			))}
		</Flex>
	),
};

export const Size: Story = {
	render: (args) => (
		<Flex columnGap='4' align='flex-start'>
			{sizeOptions.map((size) => (
				<Template {...args} key={size} size={size} variant='primary' />
			))}
		</Flex>
	),
};

export const Disabled: Story = {
	render: (args) => <Template {...args} />,
	args: {
		disabled: true,
	},
};
