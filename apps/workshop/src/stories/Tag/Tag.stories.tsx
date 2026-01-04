import { Stack, Tag, type TagProps } from '@jung/design-system';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { variantOptions } from './options';

const meta = {
	title: 'COMPONENTS/Tag',
	component: Tag,
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
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof Tag>;

const Template = (args: TagProps) => <Tag {...args}>Tag</Tag>;

export const Variants: Story = {
	render: (args) => (
		<Stack space='4' align='center'>
			{variantOptions.map((variant) => (
				<Template {...args} key={variant} variant={variant} />
			))}
		</Stack>
	),
};
