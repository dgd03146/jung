import { Tabs } from '@jung/design-system';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Tabs> = {
	title: 'COMPONENTS/Tabs',
	component: Tabs,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		variant: {
			options: ['primary', 'secondary'],
			control: { type: 'select' },
		},
		// rounded: {
		// 	options: [true, false],
		// 	control: { type: 'select' },
		// },
	},
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Variants: Story = {
	render: (args) => (
		<Tabs {...args} defaultValue='tab1' style={{ width: '375px' }}>
			<Tabs.List>
				<Tabs.Trigger value='tab1'>Tab1</Tabs.Trigger>
				<Tabs.Trigger value='tab2'>Tab2</Tabs.Trigger>
				<Tabs.Trigger value='tab3'>Tab3</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value='tab1'>Tab1 Content</Tabs.Content>
			<Tabs.Content value='tab2'>Tab2 Content</Tabs.Content>
			<Tabs.Content value='tab3'>Tab3 Content</Tabs.Content>
		</Tabs>
	),
};
