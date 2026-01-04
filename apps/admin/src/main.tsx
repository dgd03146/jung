import '@/fsd/app/styles/global.css';

import { RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import { createRouter, ReactQueryProvider } from '@/fsd/app';

const router = createRouter();

ReactDOM.createRoot(document.getElementById('root')!).render(
	// <React.StrictMode>
	<ReactQueryProvider>
		<RouterProvider router={router} />
	</ReactQueryProvider>,
	// </React.StrictMode>,
);
