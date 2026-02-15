/**
 * tRPC Provider for Admin
 *
 * 공식 문서 패턴: https://trpc.io/docs/client/tanstack-react-query/setup
 * Vite SPA 패턴 - Context 방식 사용
 */
import type { AppRouter } from '@jung/api';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import type { ReactNode } from 'react';
import React, { lazy, useEffect, useState } from 'react';
import { supabase } from '@/fsd/shared';
import { makeQueryClient } from '../react-query/queryClient';

// tRPC Context 생성 (useTRPC 훅 export)
export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

// QueryClient 싱글톤 (브라우저 환경)
let browserQueryClient: ReturnType<typeof makeQueryClient> | undefined;

function getQueryClient() {
	if (typeof window === 'undefined') {
		// 서버 환경 (SSR이 있다면)
		return makeQueryClient();
	}
	// 브라우저: 싱글톤 패턴
	if (!browserQueryClient) {
		browserQueryClient = makeQueryClient();
	}
	return browserQueryClient;
}

function getBaseUrl() {
	// Vite 환경변수에서 API URL 가져오기
	return import.meta.env.VITE_API_URL || 'http://localhost:3001';
}

// DevTools 지연 로딩
const ReactQueryDevtoolsProduction = lazy(() =>
	import('@tanstack/react-query-devtools/build/modern/production.js').then(
		(d) => ({
			default: d.ReactQueryDevtools,
		}),
	),
);

export function TrpcReactProvider({ children }: { children: ReactNode }) {
	const queryClient = getQueryClient();
	const [showDevtools, setShowDevtools] = useState(false);

	// tRPC 클라이언트 생성 (한 번만)
	const [trpcClient] = useState(() =>
		createTRPCClient<AppRouter>({
			links: [
				httpBatchLink({
					url: `${getBaseUrl()}/trpc`,
					async headers() {
						const {
							data: { session },
						} = await supabase.auth.getSession();
						if (session?.access_token) {
							return { authorization: `Bearer ${session.access_token}` };
						}
						return {};
					},
				}),
			],
		}),
	);

	useEffect(() => {
		// @ts-expect-error window 확장
		window.toggleDevtools = () => setShowDevtools((old) => !old);
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
				{children}
			</TRPCProvider>
			<ReactQueryDevtools initialIsOpen={false} />
			{showDevtools && (
				<React.Suspense fallback={null}>
					<ReactQueryDevtoolsProduction />
				</React.Suspense>
			)}
		</QueryClientProvider>
	);
}

export default TrpcReactProvider;
