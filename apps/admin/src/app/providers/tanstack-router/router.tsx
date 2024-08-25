import type { QueryClient } from '@tanstack/react-query';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';

import { routeTree } from '@/fsd/routeTree.gen';
import { queryClient } from '../react-query/ReactQueryProvider';
import { trpcQueryUtils } from '../trpc/TrpcProvider';

// 타입 안전성을 위한 라우터 인스턴스 등록
declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}

type ExtendedContext = {
	queryClient: QueryClient;
	trpcQueryUtils: typeof trpcQueryUtils;
};

export function createRouter() {
	const router = createTanStackRouter({
		routeTree,
		defaultPreload: 'intent',
		context: {
			queryClient,
			trpcQueryUtils,
		} as ExtendedContext,
		// FIXME: 로딩스피너로 변경
		defaultPendingComponent: () => <div>Loading....</div>,
	});

	return router;
}
