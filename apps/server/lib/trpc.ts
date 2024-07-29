import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

export function createTRPCContext() {
	return {}; // Add context if need
}

export const publicProcedure = t.procedure;
export const { createCallerFactory, router } = t;
