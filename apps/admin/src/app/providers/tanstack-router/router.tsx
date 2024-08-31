import type { QueryClient } from '@tanstack/react-query';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';

import { routeTree } from '@/fsd/routeTree.gen';
import { Flex, Typography } from '@jung/design-system/components';
import { queryClient } from '../react-query/ReactQueryProvider';
// import { trpcQueryUtils } from '../trpc/TrpcProvider';

// 타입 안전성을 위한 라우터 인스턴스 등록
declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}

type ExtendedContext = {
	queryClient: QueryClient;
	// trpcQueryUtils: typeof trpcQueryUtils;
};

const LoadingComponent = () => (
	<Flex
		flexDirection='column'
		alignItems='center'
		justifyContent='center'
		height='full'
	>
		<Typography.Heading level={2} color='primary'>
			Loading page...
		</Typography.Heading>
	</Flex>
);

export function createRouter() {
	const router = createTanStackRouter({
		routeTree,
		defaultPreload: 'intent',
		context: {
			queryClient,
			// trpcQueryUtils,
		} as ExtendedContext,
		// FIXME: 나중에 변경
		defaultPendingComponent: LoadingComponent,
	});

	return router;
}
