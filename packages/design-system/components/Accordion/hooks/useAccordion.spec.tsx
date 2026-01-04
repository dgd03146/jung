import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useAccordion } from './useAccordion';

describe('useAccordion hook', () => {
	describe('single type', () => {
		it('initializes with correct default values', () => {
			const { result } = renderHook(() => useAccordion({ type: 'single' }));

			expect(result.current.value.openIndexes).toEqual(new Set());
		});

		it('handles toggle index correctly', () => {
			const { result } = renderHook(() => useAccordion({ type: 'single' }));

			act(() => {
				result.current.value.handleToggleIndex(1);
			});

			expect(result.current.value.openIndexes).toEqual(new Set([1]));

			act(() => {
				result.current.value.handleToggleIndex(1);
			});

			expect(result.current.value.openIndexes).toEqual(new Set());
		});
	});

	describe('multiple type', () => {
		it('initializes with correct default values', () => {
			const { result } = renderHook(() => useAccordion({ type: 'multiple' }));

			expect(result.current.value.openIndexes).toEqual(new Set());
		});

		it('handles toggle index correctly', () => {
			const { result } = renderHook(() => useAccordion({ type: 'multiple' }));

			act(() => {
				result.current.value.handleToggleIndex(1);
			});

			expect(result.current.value.openIndexes).toEqual(new Set([1]));

			act(() => {
				result.current.value.handleToggleIndex(2);
			});

			expect(result.current.value.openIndexes).toEqual(new Set([1, 2]));

			act(() => {
				result.current.value.handleToggleIndex(1);
			});

			expect(result.current.value.openIndexes).toEqual(new Set([2]));
		});
	});
});
