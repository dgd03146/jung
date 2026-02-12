import { useCallback, useMemo, useState } from 'react';

export const useBulkSelection = () => {
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

	const isSelected = useCallback(
		(id: string) => selectedIds.has(id),
		[selectedIds],
	);

	const toggle = useCallback((id: string) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) {
				next.delete(id);
			} else {
				next.add(id);
			}
			return next;
		});
	}, []);

	const toggleAll = useCallback((allIds: string[]) => {
		setSelectedIds((prev) => {
			const allSelected = allIds.every((id) => prev.has(id));
			return allSelected ? new Set() : new Set(allIds);
		});
	}, []);

	const clear = useCallback(() => {
		setSelectedIds(new Set());
	}, []);

	const count = selectedIds.size;

	const isAllSelected = useCallback(
		(allIds: string[]) =>
			allIds.length > 0 && allIds.every((id) => selectedIds.has(id)),
		[selectedIds],
	);

	const isIndeterminate = useCallback(
		(allIds: string[]) => {
			const selectedCount = allIds.filter((id) => selectedIds.has(id)).length;
			return selectedCount > 0 && selectedCount < allIds.length;
		},
		[selectedIds],
	);

	return useMemo(
		() => ({
			selectedIds,
			isSelected,
			toggle,
			toggleAll,
			clear,
			count,
			isAllSelected,
			isIndeterminate,
		}),
		[
			selectedIds,
			isSelected,
			toggle,
			toggleAll,
			clear,
			count,
			isAllSelected,
			isIndeterminate,
		],
	);
};
