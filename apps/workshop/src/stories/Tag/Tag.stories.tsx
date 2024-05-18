import type { Meta, StoryObj } from '@storybook/react';

import { Stack, Tag, type TagProps } from '@jung/design-system';

type Variant = 'primary' | 'secondary' | 'ghost';
const variantOptions: Variant[] = ['primary', 'secondary', 'ghost'];

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
	},
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof Tag>;

const Template = (args: TagProps) => <Tag {...args}>텍스트</Tag>;

export const Variants: Story = {
	render: (args) => (
		<Stack space='4' align='center'>
			{variantOptions.map((variant) => (
				<Template {...args} key={variant} variant={variant} />
			))}
		</Stack>
	),
};
