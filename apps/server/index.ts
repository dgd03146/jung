export { caller } from './routes/app';
export { router } from './lib/trpc';
export { type AppRouter, appRouter } from './routes/app';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import type { Application } from 'express';
import { appRouter } from './routes/app';

const app: Application = express();

app.use(
	'/api/trpc',
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext: () => ({}),
	}),
);

// Vercel에서 서버리스 함수로 실행하기 위해 app을 export
export default app;

// 로컬 개발 환경에서만 서버 실행
if (process.env.NODE_ENV !== 'production') {
	app.listen(4000, () => {
		console.log('서버가 http://localhost:4000 에서 실행 중입니다.');
	});
}
