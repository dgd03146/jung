// Accordion.test.tsx

import * as styles from './Accordion.css';

import { cleanup, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import { Accordion } from './index';

describe('Accordion Component', () => {
	const renderComponent = (type: 'single' | 'multiple') => {
		return render(
			<Accordion type={type}>
				<Accordion.Item>
					<Accordion.Trigger>Trigger 1</Accordion.Trigger>
					<Accordion.Content>
						<Accordion.Panel>Panel 1</Accordion.Panel>
					</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item>
					<Accordion.Trigger>Trigger 2</Accordion.Trigger>
					<Accordion.Content>
						<Accordion.Panel>Panel 2</Accordion.Panel>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion>,
		);
	};

	let trigger1: HTMLElement;
	let trigger2: HTMLElement;
	let content1: HTMLElement;
	let content2: HTMLElement;

	afterEach(() => {
		cleanup();
	});

	describe('single mode', () => {
		beforeEach(() => {
			renderComponent('single');
			trigger1 = screen.getByText('Trigger 1');
			trigger2 = screen.getByText('Trigger 2');
			content1 = screen.getByTestId('accordion-content-1');
			content2 = screen.getByTestId('accordion-content-2');
		});

		it('should have both panels closed initially', () => {
			expect(content1).toHaveClass(styles.content({ isOpen: false }));
			expect(content2).toHaveClass(styles.content({ isOpen: false }));
		});

		it('should open first panel and close second panel when first trigger is clicked', async () => {
			await act(async () => {
				await userEvent.click(trigger1);
			});
			expect(content1).toHaveClass(styles.content({ isOpen: true }));
			expect(content2).toHaveClass(styles.content({ isOpen: false }));
		});

		it('should close first panel and open second panel when second trigger is clicked', async () => {
			await act(async () => {
				await userEvent.click(trigger2);
			});

			expect(content1).toHaveClass(styles.content({ isOpen: false }));
			expect(content2).toHaveClass(styles.content({ isOpen: true }));
		});
	});

	describe('multiple mode', () => {
		beforeEach(() => {
			renderComponent('multiple');
			trigger1 = screen.getByText('Trigger 1');
			trigger2 = screen.getByText('Trigger 2');
			content1 = screen.getByTestId('accordion-content-1');
			content2 = screen.getByTestId('accordion-content-2');
		});

		it('should have both panels closed initially', () => {
			expect(content1).toHaveClass(styles.content({ isOpen: false }));
			expect(content2).toHaveClass(styles.content({ isOpen: false }));
		});

		it('should open first panel when first trigger is clicked', async () => {
			await act(async () => {
				await userEvent.click(trigger1);
			});
			expect(content1).toHaveClass(styles.content({ isOpen: true }));
			expect(content2).toHaveClass(styles.content({ isOpen: false }));
		});

		it('should open both panels when both triggers are clicked', async () => {
			await act(async () => {
				await userEvent.click(trigger1);
			});
			await act(async () => {
				await userEvent.click(trigger2);
			});

			expect(content1).toHaveClass(styles.content({ isOpen: true }));
			expect(content2).toHaveClass(styles.content({ isOpen: true }));
		});

		it('should close first panel and keep second panel open when first trigger is clicked again', async () => {
			await act(async () => {
				await userEvent.click(trigger1);
			});
			await act(async () => {
				await userEvent.click(trigger2);
			});
			await act(async () => {
				await userEvent.click(trigger1);
			});

			expect(content1).toHaveClass(styles.content({ isOpen: false }));
			expect(content2).toHaveClass(styles.content({ isOpen: true }));
		});

		it('should close both panels when both triggers are clicked again', async () => {
			await act(async () => {
				await userEvent.click(trigger1);
			});
			await act(async () => {
				await userEvent.click(trigger2);
			});
			await act(async () => {
				await userEvent.click(trigger1);
			});
			await act(async () => {
				await userEvent.click(trigger2);
			});
			expect(content1).toHaveClass(styles.content({ isOpen: false }));
			expect(content2).toHaveClass(styles.content({ isOpen: false }));
		});
	});
});
