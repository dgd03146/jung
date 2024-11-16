import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const usePhotoTabs = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const currentTab = searchParams.get('tab') || 'recent';

	const getTabUrl = (tabValue: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (tabValue === 'recent') {
			params.delete('tab');
		} else {
			params.set('tab', tabValue);
		}

		const queryString = params.toString();
		return `${pathname}${queryString ? `?${queryString}` : ''}`;
	};

	const handleTabChange = (value: string | number) => {
		router.push(getTabUrl(value.toString()), { scroll: false });
	};

	return {
		currentTab,
		handleTabChange,
	};
};
