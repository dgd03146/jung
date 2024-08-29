export { caller } from './routes/app';
export { router } from './lib/trpc';
export { type AppRouter, appRouter } from './routes/app';
import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import { appRouter } from './routes/app';

const handler = createHTTPHandler({
	router: appRouter,
	createContext: () => ({}),
});

export default handler;

if (process.env.NODE_ENV !== 'production') {
	import('node:http').then((http) => {
		const server = http.createServer((req, res) => {
			if (req.url?.startsWith('/trpc')) {
				handler(req, res);
			} else {
				res.writeHead(404);
				res.end('Not found');
			}
		});

		server.listen(3001);
		console.log('Development server is running on http://localhost:3001');
	});
}
