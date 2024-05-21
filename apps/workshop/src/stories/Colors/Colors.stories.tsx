import type { Meta, StoryObj } from '@storybook/react';

import { Box, Flex, Stack, Typography } from '@jung/design-system';
import { colors } from './colors';

const meta = {
	title: 'FOUNDATIONS/Colors',
	component: Box,
	parameters: {
		layout: 'centered',
	},

	argTypes: {},
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof Box>;

export const Colors: Story = {
	render: () => (
		<Stack space='4' align='left'>
			{colors.map((category) => (
				<Stack key={category.title} space='4' align='left'>
					<Typography.Heading level={4}>{category.title}</Typography.Heading>
					<Flex columnGap='4'>
						{category.colors.map(({ name }) => (
							<Box
								key={name}
								padding='8'
								width='40'
								fontSize='sm'
								textAlign='center'
								background={name}
								color={
									name.startsWith('white') || name.startsWith('gray')
										? 'black'
										: 'white'
								}
							>
								{name}
							</Box>
						))}
					</Flex>
				</Stack>
			))}
		</Stack>
	),
};
