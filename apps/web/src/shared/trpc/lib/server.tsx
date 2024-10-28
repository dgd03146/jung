import 'server-only';

import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { cache } from 'react';

import { appRouter } from '@jung/server';
import { createCallerFactory } from '@jung/server/lib/trpc';
import { makeQueryClient } from '../../react-query/lib/getQueryClient';
// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.

export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)({
	// createTRPCContext
});
export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
	caller,
	getQueryClient,
);
