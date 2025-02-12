import { Button, Flex, Tooltip, type TooltipProps } from '@jung/design-system';
import type { Meta, StoryObj } from '@storybook/react';

type Variant = 'primary' | 'secondary';
const variantOptions: Variant[] = ['primary', 'secondary'];

type Size = 'sm' | 'md';
const sizeOptions: Size[] = ['sm', 'md'];

type Placement = 'left' | 'center' | 'right';
const placementOptions: Placement[] = ['left', 'center', 'right'];

type Close = boolean;
const closeOptions: Close[] = [true, false];

const meta: Meta<typeof Tooltip> = {
	title: 'COMPONENTS/Tooltip',
	component: Tooltip,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		variant: {
			options: variantOptions,
			control: { type: 'select' },
		},
		size: {
			options: sizeOptions,
			control: { type: 'select' },
		},
		placement: {
			options: placementOptions,
			control: { type: 'select' },
		},
		close: {
			options: closeOptions,
			control: { type: 'select' },
		},
	},
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

const Template = (args: TooltipProps & { label: string }) => (
	<Tooltip {...args}>
		<Button variant='primary' size='sm'>
			Tooltip Button
		</Button>
	</Tooltip>
);

export const Variants: StoryObj<TooltipProps> = {
	render: (args) => (
		<Flex columnGap='4'>
			{variantOptions.map((variant, index) => (
				<Template
					{...args}
					key={variant}
					variant={variant}
					content={`Tooltip${index + 1}`}
					label={`${variant}`}
					tooltipId={`Tooltip${index + 1}`}
				/>
			))}
		</Flex>
	),
};

export const Size: Story = {
	render: (args) => (
		<Flex columnGap='4'>
			{sizeOptions.map((size, index) => (
				<Template
					{...args}
					key={size}
					size={size}
					content={`Tooltip${index + 1}`}
					label={`${size}`}
					tooltipId={`Tooltip${index + 1}`}
				/>
			))}
		</Flex>
	),
};

export const Placement: Story = {
	render: (args) => (
		<Flex columnGap='4'>
			{placementOptions.map((placement, index) => (
				<Template
					{...args}
					key={placement}
					placement={placement}
					content={`Tooltip${index + 1}`}
					label={`${placement}`}
					tooltipId={`Tooltip${index + 1}`}
				/>
			))}
		</Flex>
	),
};

export const WithClose: Story = {
	render: (args) => (
		<Template {...args} content='Tooltip' label='With Close' close />
	),
};
