import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea Component', () => {
	const renderComponent = (props = {}) => {
		return render(<Textarea {...props} />);
	};

	it('should call onChange handler when Textarea changes', async () => {
		const handleChange = vi.fn();
		renderComponent({ onChange: handleChange });
		const textarea = screen.getByRole('textbox');

		await userEvent.type(textarea, 'Hello');
		expect(handleChange).toHaveBeenCalledTimes(5);
		expect(textarea).toHaveValue('Hello');
	});

	it('should be disabled when disabled prop is true', () => {
		renderComponent({ disabled: true });
		const textarea = screen.getByRole('textbox');
		expect(textarea).toBeDisabled();
	});
});
