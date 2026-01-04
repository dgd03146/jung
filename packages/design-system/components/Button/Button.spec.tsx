import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button Component', () => {
	const renderComponent = (props = {}) => {
		return render(<Button {...props} />);
	};

	it('should call onClick handler when clicked', async () => {
		const handleClick = vi.fn();
		renderComponent({ onClick: handleClick, children: 'Click me' });
		const button = screen.getByRole('button', { name: 'Click me' });

		await userEvent.click(button);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('should be disabled when disabled prop is true', () => {
		renderComponent({ disabled: true, children: 'Disabled Button' });
		const button = screen.getByRole('button', { name: 'Disabled Button' });
		expect(button).toBeDisabled();
	});

	it('should be disabled when in loading state', () => {
		renderComponent({ loading: true, children: 'Loading' });
		const button = screen.getByRole('button', { name: 'Loading' });
		expect(button).toHaveAttribute('aria-busy', 'true');
		expect(button).toBeDisabled();
	});
});
