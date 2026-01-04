import { Flex, Textarea, type TextareaProps } from '@jung/design-system';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { sizeOptions, variantOptions } from './options';

const meta = {
	title: 'COMPONENTS/Textarea',
	component: Textarea,
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
		rounded: {
			options: [true, false],
			control: { type: 'select' },
		},
		cols: {
			options: [10, 20, 30, 40, 50],
			control: { type: 'select' },
		},
		rows: {
			options: [5, 6, 7, 8, 9, 10],
			control: { type: 'select' },
		},
		disabled: {
			options: [true, false],
			control: { type: 'select' },
		},
	},
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof Textarea>;

const Template = (args: TextareaProps) => (
	<Textarea size='sm' {...args} placeholder='Enter...' />
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
