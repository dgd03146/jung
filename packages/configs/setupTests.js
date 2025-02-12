import '@testing-library/jest-dom';

import { vi } from 'vitest';

/// <reference types="vitest" />
// Zustand 모킹
vi.mock('zustand');

// `matchMedia` 모킹
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(), // deprecated
		removeListener: vi.fn(), // deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});
