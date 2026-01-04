import { initTRPC } from '@trpc/server';
import { getHTTPStatusCodeFromError } from '@trpc/server/http';
import { ZodError } from 'zod';

export const createTRPCContext = async () => {
	return {};
};

const t = initTRPC.create({
	errorFormatter(opts) {
		const { shape, error } = opts;
		return {
			...shape,
			data: {
				...shape.data,
				httpCode: getHTTPStatusCodeFromError(error),
				zodError:
					error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
						? error.cause.flatten()
						: null,
			},
		};
	},
});

export const publicProcedure = t.procedure;
export const { createCallerFactory, router } = t;
