import { useDebounce } from '@jung/shared/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export const useSearch = (initialValue = '') => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const [value, setValue] = useState(
		initialValue || searchParams.get('q') || '',
	);

	const debouncedValue = useDebounce(value, 300);

	const handleSearch = useCallback(
		(searchValue: string) => {
			const params = new URLSearchParams(searchParams.toString());

			if (searchValue) {
				params.set('q', searchValue);
			} else {
				params.delete('q');
			}

			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		},
		[pathname, router, searchParams],
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: handleSearch in deps causes infinite loop (searchParams change → handleSearch recreated → useEffect re-run)
	useEffect(() => {
		handleSearch(debouncedValue);
	}, [debouncedValue]);

	return {
		value,
		setValue,
	};
};
