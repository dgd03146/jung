import { createClient } from '@supabase/supabase-js';
import { initTRPC, TRPCError } from '@trpc/server';
import { getHTTPStatusCodeFromError } from '@trpc/server/http';
import { ZodError } from 'zod';

export interface TRPCUser {
	id: string;
	email?: string;
	app_metadata: Record<string, unknown>;
	user_metadata: Record<string, unknown>;
	aud: string;
	created_at: string;
}

export const createTRPCContext = async (opts?: {
	headers?: Headers;
}): Promise<{ user: TRPCUser | null }> => {
	const authHeader = opts?.headers?.get('authorization');

	if (!authHeader?.startsWith('Bearer ')) {
		return { user: null };
	}

	const supabaseUrl =
		process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseKey =
		process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseKey) {
		return { user: null };
	}

	const token = authHeader.replace('Bearer ', '');
	const supabase = createClient(supabaseUrl, supabaseKey, {
		global: { headers: { Authorization: `Bearer ${token}` } },
	});

	try {
		const {
			data: { user },
		} = await supabase.auth.getUser(token);
		return { user: user as TRPCUser | null };
	} catch {
		return { user: null };
	}
};

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
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

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
	if (!ctx.user) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}
	return next({ ctx: { ...ctx, user: ctx.user } });
});

export const { createCallerFactory, router } = t;
