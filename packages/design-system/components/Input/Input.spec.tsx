import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Input } from './Input';

describe('Input Component', () => {
	const renderComponent = (props = {}) => {
		return render(<Input {...props} />);
	};

	it('should call onChange handler when input changes', async () => {
		const handleChange = vi.fn();
		renderComponent({ onChange: handleChange });
		const input = screen.getByRole('textbox');

		await userEvent.type(input, 'Hello');
		expect(handleChange).toHaveBeenCalledTimes(5);
		expect(input).toHaveValue('Hello');
	});

	it('should be disabled when disabled prop is true', () => {
		renderComponent({ disabled: true });
		const input = screen.getByRole('textbox');
		expect(input).toBeDisabled();
	});
});
