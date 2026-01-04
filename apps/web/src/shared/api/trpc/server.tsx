import 'server-only'; // <-- ensure this file cannot be imported from the client

import { appRouter, createTRPCContext } from '@jung/api';
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import { cache } from 'react';
import { makeQueryClient } from '@/fsd/shared';

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy({
	ctx: createTRPCContext,
	router: appRouter,
	queryClient: getQueryClient,
});

export const caller = appRouter.createCaller(createTRPCContext);
