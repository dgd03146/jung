import { Badge, type BadgeProps, Stack } from '@jung/design-system';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { variantOptions } from './options';

const meta = {
	title: 'COMPONENTS/Badge',
	component: Badge,
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
			options: ['sm', 'md', 'lg'],
			control: { type: 'select' },
		},
		// rounded: {
		// 	options: [true, false],
		// 	control: { type: 'select' },
		// },
	},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

const Template = (args: BadgeProps) => <Badge {...args}>Badge</Badge>;

export const Variants: Story = {
	render: (args) => (
		<Stack space='4' align='center'>
			{variantOptions.map((variant) => (
				<Template {...args} key={variant} variant={variant} />
			))}
		</Stack>
	),
};
