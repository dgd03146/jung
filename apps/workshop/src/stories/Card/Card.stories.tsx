import { Badge, Card, Tag } from '@jung/design-system';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Card> = {
	title: 'Components/Card',
	component: Card,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		variant: {
			options: ['primary', 'secondary', 'outline'],
			control: { type: 'select' },
		},
		layout: {
			options: ['vertical', 'horizontal'],
			control: { type: 'select' },
		},
	},
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
	render: (args) => (
		<Card {...args} style={{ maxWidth: '300px' }}>
			<Card.Media>
				<img
					src='https://images.unsplash.com/photo-1517394834181-95ed159986c7?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
					alt='card media'
				/>
			</Card.Media>
			<Card.Content>
				<Card.Title>This is title</Card.Title>
				<Card.Description>This is description</Card.Description>
				<Card.Actions>
					<Badge>hihi</Badge>
				</Card.Actions>
			</Card.Content>
		</Card>
	),
};

export const Horizontal: Story = {
	render: (args) => (
		<Card layout='horizontal' {...args}>
			<Card.Media style={{ maxWidth: '300px' }}>
				<img
					src='https://images.unsplash.com/photo-1517394834181-95ed159986c7?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
					alt='card media'
				/>
			</Card.Media>
			<Card.Content>
				<Card.Title>This is title</Card.Title>
				<Card.Description>This is description</Card.Description>
				<Card.Actions>
					<Tag>2024.12.07</Tag>
					<Tag>Tag</Tag>
					<Tag>Tag</Tag>
				</Card.Actions>
			</Card.Content>
		</Card>
	),
};
