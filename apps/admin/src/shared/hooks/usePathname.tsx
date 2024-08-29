import { useRouterState } from '@tanstack/react-router';

const usePathname = () => {
	const router = useRouterState();
	const pathname = router.location.pathname;
	return { router, pathname };
};

export default usePathname;
