import 'server-only'; // <-- ensure this file cannot be imported from the client

import { makeQueryClient } from '@/fsd/shared';
import { appRouter, createTRPCContext } from '@jung/server';
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import { cache } from 'react';

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy({
	ctx: createTRPCContext,
	router: appRouter,
	queryClient: getQueryClient,
});

export const caller = appRouter.createCaller(createTRPCContext);
