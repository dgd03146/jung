// import type { AppRouter } from '@jung/server';
// import { httpBatchLink } from '@trpc/client';
// import { createTRPCQueryUtils, createTRPCReact } from '@trpc/react-query';
// import type { ReactNode } from 'react';
// import { queryClient } from '../react-query/ReactQueryProvider';

// export const trpc = createTRPCReact<AppRouter>({});

// export const trpcClient = trpc.createClient({
// 	links: [
// 		httpBatchLink({
// 			url: '/trpc',
// 		}),
// 	],
// });

// export const trpcQueryUtils = createTRPCQueryUtils({
// 	queryClient,
// 	client: trpcClient,
// });

// const TrpcProvider = ({ children }: { children: ReactNode }) => {
// 	return (
// 		<trpc.Provider client={trpcClient} queryClient={queryClient}>
// 			{children}
// 		</trpc.Provider>
// 	);
// };

// export default TrpcProvider;
