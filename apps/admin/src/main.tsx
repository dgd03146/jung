import '@/fsd/app/styles/global.css';

import { RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import { createRouter, TrpcReactProvider } from '@/fsd/app';

const router = createRouter();

ReactDOM.createRoot(document.getElementById('root')!).render(
	// <React.StrictMode>
	<TrpcReactProvider>
		<RouterProvider router={router} />
	</TrpcReactProvider>,
	// </React.StrictMode>,
);
