import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { act } from 'react';
import { describe } from 'vitest';
import { Tabs } from './index';

describe('Tabs Component', () => {
	const user = userEvent.setup();

	beforeEach(() => {
		render(
			<Tabs defaultValue='tab1'>
				<Tabs.List>
					<Tabs.Trigger value='tab1'>Tab1</Tabs.Trigger>
					<Tabs.Trigger value='tab2'>Tab2</Tabs.Trigger>
					<Tabs.Trigger value='tab3'>Tab3</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value='tab1'>Tab1 Content</Tabs.Content>
				<Tabs.Content value='tab2'>Tab2 Content</Tabs.Content>
				<Tabs.Content value='tab3'>Tab3 Content</Tabs.Content>
			</Tabs>,
		);
	});

	it('should switch tabs when clicked and update content', async () => {
		expect(screen.getByRole('tab', { name: 'Tab1' })).toHaveAttribute(
			'aria-selected',
			'true',
		);
		expect(screen.getByText('Tab1 Content')).toBeInTheDocument();
		expect(screen.queryByText('Tab2 Content')).not.toBeInTheDocument();

		const tab2 = screen.getByRole('tab', { name: 'Tab2' });

		await act(async () => {
			await user.click(tab2);
		});

		expect(tab2).toHaveAttribute('aria-selected', 'true');
		expect(screen.getByRole('tab', { name: 'Tab1' })).toHaveAttribute(
			'aria-selected',
			'false',
		);
		expect(screen.queryByText('Tab1 Content')).not.toBeInTheDocument();
		expect(screen.getByText('Tab2 Content')).toBeInTheDocument();
	});

	it('should have correct ARIA attributes', () => {
		const tablist = screen.getByRole('tablist');
		expect(tablist).toBeInTheDocument();

		const tabs = screen.getAllByRole('tab');
		expect(tabs).toHaveLength(3);

		tabs.forEach((tab, index) => {
			expect(tab).toHaveAttribute(
				'aria-selected',
				index === 0 ? 'true' : 'false',
			);
		});
	});
});
