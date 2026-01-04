import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		options: {
			storySort: {
				order: ['FOUNDATIONS', 'COMPONENTS', ['Colors', 'Others']],
			},
		},
	},
};

export default preview;
