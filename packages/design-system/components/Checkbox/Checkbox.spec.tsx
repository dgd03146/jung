import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox Component', () => {
	const renderCheckbox = (props = {}) => {
		return render(<Checkbox {...props} />);
	};

	it('calls onChange handler when clicked', async () => {
		const handleChange = vi.fn();
		renderCheckbox({ onChange: handleChange });

		const checkbox = screen.getByTestId('checkbox');
		await userEvent.click(checkbox);

		expect(handleChange).toHaveBeenCalledTimes(1);
	});

	it('does not call onChange handler when disabled', async () => {
		const handleChange = vi.fn();
		renderCheckbox({ onChange: handleChange, disabled: true });

		const checkbox = screen.getByTestId('checkbox');
		await userEvent.click(checkbox);

		expect(handleChange).not.toHaveBeenCalled();
	});

	it('reflects checked state correctly', () => {
		const { rerender } = renderCheckbox({ checked: false });
		expect(screen.getByTestId('checkbox')).not.toBeChecked();

		rerender(<Checkbox checked={true} />);
		expect(screen.getByTestId('checkbox')).toBeChecked();
	});
});
