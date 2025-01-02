import { useCallback } from 'react';
import { useSpotTable } from './useSpotTable';

export const useSpotTableFilter = () => {
	const { table } = useSpotTable();

	const handleFilterChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			table.setGlobalFilter(event.target.value);
		},
		[table],
	);

	return {
		filter: table.getState().globalFilter,
		handleFilterChange,
	};
};
