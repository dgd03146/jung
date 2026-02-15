import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, it } from 'vitest';
import { Accordion } from './index';

describe('Accordion Component', () => {
	const renderAccordion = (type: 'single' | 'multiple') => {
		return render(
			<Accordion type={type}>
				<Accordion.Item>
					<Accordion.Trigger>Trigger 1</Accordion.Trigger>
					<Accordion.Content>Panel 1</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item>
					<Accordion.Trigger>Trigger 2</Accordion.Trigger>
					<Accordion.Content>Panel 2</Accordion.Content>
				</Accordion.Item>
			</Accordion>,
		);
	};

	afterEach(() => {
		cleanup();
		sessionStorage.clear();
	});

	const getElements = () => ({
		trigger1: screen.getByText('Trigger 1'),
		trigger2: screen.getByText('Trigger 2'),
		content1: screen.getByTestId('accordion-content-1'),
		content2: screen.getByTestId('accordion-content-2'),
	});

	const isPanelHidden = (element: HTMLElement) =>
		element.getAttribute('tabindex') === '-1';

	describe('single mode', () => {
		beforeEach(() => {
			renderAccordion('single');
		});

		it('should open one panel at a time', async () => {
			const { trigger1, trigger2, content1, content2 } = getElements();

			expect(isPanelHidden(content1)).toBe(true);
			expect(isPanelHidden(content2)).toBe(true);

			await userEvent.click(trigger1);
			expect(isPanelHidden(content1)).toBe(false);
			expect(isPanelHidden(content2)).toBe(true);

			await userEvent.click(trigger2);
			expect(isPanelHidden(content1)).toBe(true);
			expect(isPanelHidden(content2)).toBe(false);
		});

		it('should close the open panel when clicked again', async () => {
			const { trigger1, content1 } = getElements();

			await userEvent.click(trigger1);
			expect(isPanelHidden(content1)).toBe(false);

			await userEvent.click(trigger1);
			expect(isPanelHidden(content1)).toBe(true);
		});
	});

	describe('multiple mode', () => {
		beforeEach(() => {
			renderAccordion('multiple');
		});

		it('should allow multiple panels to be open', async () => {
			const { trigger1, trigger2, content1, content2 } = getElements();

			await userEvent.click(trigger1);
			await userEvent.click(trigger2);
			expect(isPanelHidden(content1)).toBe(false);
			expect(isPanelHidden(content2)).toBe(false);
		});

		it('should toggle individual panels', async () => {
			const { trigger1, trigger2, content1, content2 } = getElements();

			await userEvent.click(trigger1);
			expect(isPanelHidden(content1)).toBe(false);
			expect(isPanelHidden(content2)).toBe(true);

			await userEvent.click(trigger2);
			expect(isPanelHidden(content1)).toBe(false);
			expect(isPanelHidden(content2)).toBe(false);

			await userEvent.click(trigger1);
			expect(isPanelHidden(content1)).toBe(true);
			expect(isPanelHidden(content2)).toBe(false);
		});
	});
});
