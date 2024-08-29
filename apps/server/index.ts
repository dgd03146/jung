export { caller } from './routes/app';
export { router } from './lib/trpc';
export { type AppRouter, appRouter } from './routes/app';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { appRouter } from './routes/app';

const app = express();

app.use(
	'/api/trpc',
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext: () => ({}),
	}),
);

app.listen(4000, () => {
	console.log('서버가 http://localhost:4000 에서 실행 중입니다.');
});
