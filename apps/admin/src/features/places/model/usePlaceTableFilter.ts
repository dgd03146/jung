import { useCallback } from 'react';
import { usePlaceTable } from './usePlaceTable';

export const usePlaceTableFilter = () => {
	const { table } = usePlaceTable();

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
