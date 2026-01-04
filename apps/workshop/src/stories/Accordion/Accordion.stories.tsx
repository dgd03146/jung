import { Accordion, type AccordionProps } from '@jung/design-system';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Accordion> = {
	title: 'Components/Accordion',
	component: Accordion,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		type: {
			options: ['single', 'multiple'],
			control: { type: 'select' },
		},
	},
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof Accordion>;

const Template = (args: AccordionProps) => (
	<Accordion type={args.type} style={{ width: '375px' }} {...args}>
		<Accordion.Item>
			<Accordion.Trigger top={<div>Trigger 1</div>}>
				Question 1: What is React?
			</Accordion.Trigger>
			<Accordion.Content>
				<Accordion.Panel title='Answer 1'>
					React is a JavaScript library for building user interfaces.
				</Accordion.Panel>
				<Accordion.Panel title='Answer 2'>
					It allows developers to create large web applications that can update
					and render efficiently.
				</Accordion.Panel>
			</Accordion.Content>
		</Accordion.Item>

		<Accordion.Item>
			<Accordion.Trigger top={<div>Trigger 2</div>}>
				Question 2: What is JSX?
			</Accordion.Trigger>
			<Accordion.Content>
				<Accordion.Panel>
					JSX is a syntax extension for JavaScript that looks similar to XML or
					HTML.
				</Accordion.Panel>
			</Accordion.Content>
		</Accordion.Item>

		<Accordion.Item>
			<Accordion.Trigger top={<div>Trigger 3</div>}>
				Question 3: What is a component in React?
			</Accordion.Trigger>
			<Accordion.Content>
				<Accordion.Panel>
					Components are independent, reusable pieces of UI in a React
					application.
				</Accordion.Panel>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion>
);

export const Default: Story = {
	render: (args) => <Template {...args} type='single' />,
};

export const Multiple: Story = {
	render: (args) => <Template {...args} type='multiple' />,
};
