import { appRouter } from '@/shared/api/router';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const server = createHTTPServer({
	router: appRouter,
});

server.listen(3001);
console.log('Server listening on http://localhost:3001');
