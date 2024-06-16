import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from './Button';

describe('Button component', () => {
	it('renders children correctly', () => {
		render(<Button>Click Me</Button>);

		expect(screen.getByText('Click Me')).toBeInTheDocument();
	});
});
