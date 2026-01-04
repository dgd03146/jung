import {
	Button,
	Toast,
	ToastContainer,
	ToastProvider,
	useToast,
} from '@jung/design-system';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'COMPONENTS/Toast',
	component: Toast,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof Toast>;

const Template = () => {
	const showToast = useToast();
	return (
		<Button
			variant='primary'
			size='sm'
			onClick={() => showToast('Toast Message')}
		>
			Show Toast
		</Button>
	);
};

export const Default: Story = {
	render: () => (
		<ToastProvider>
			<ToastContainer />
			<Template />
		</ToastProvider>
	),
};
