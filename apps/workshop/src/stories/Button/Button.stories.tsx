import type { Meta, StoryObj } from '@storybook/react';

import { Button, type ButtonProps, Flex } from '@jung/design-system';

import { sizeOptions, variantOptions } from './options';

const meta = {
	title: 'COMPONENTS/Button',
	component: Button,
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
		loading: {
			options: [true, false],
			control: { type: 'select' },
		},
		disabled: {
			options: [true, false],
			control: { type: 'select' },
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

const Template = (args: ButtonProps) => (
	<Button size='sm' {...args}>
		Button
	</Button>
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

// export const Rounded: Story = {
//   render: (args) => <Template {...args} />,
//   args: {
//     rounded: true,
//     variant: 'primary',
//   },
// };

export const Loading: Story = {
	render: (args) => <Template {...args} />,
	args: {
		loading: true,
	},
};

export const Disabled: Story = {
	render: (args) => <Template {...args} />,
	args: {
		disabled: true,
	},
};

export const WithIcons: Story = {
	render: (args) => <Template {...args} />,
	args: {
		prefix: '✅',
		suffix: '✅',
		variant: 'primary',
	},
};
