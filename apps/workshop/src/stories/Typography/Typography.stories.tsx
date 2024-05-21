import { Stack, Typography } from '@jung/design-system';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'FOUNDATIONS/Typography',
	component: Typography,
	parameters: {
		layout: 'centered',
	},

	argTypes: {},
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof Typography>;

const { Heading, Text, SubText, FootNote } = Typography;

export const Default: Story = {
	args: {
		children: (
			<Stack space='4' align='left'>
				<Heading level={1}>Heading 1</Heading>
				<Heading level={2}>Heading 2</Heading>
				<Heading level={3}>Heading 3</Heading>
				<Heading level={4}>Heading 4</Heading>
				<br />
				<Text level={1}>Text 1</Text>
				<Text level={2}>Text 2</Text>
				<Text level={3}>Text 3</Text>
				<br />
				<SubText level={1}>SubText 1</SubText>
				<SubText level={2}>SubText 2</SubText>
				<SubText level={3}>SubText 3</SubText>
				<SubText level={4}>SubText 4</SubText>
				<br />
				<FootNote level={1}>FootNote 1</FootNote>
				<FootNote level={2}>FootNote 2</FootNote>
				<FootNote level={3}>FootNote 3</FootNote>
			</Stack>
		),
	},
};
