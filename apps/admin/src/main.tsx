import '@/fsd/app/styles/global.css';

import { ReactQueryProvider, createRouter } from '@/fsd/app';
import { RouterProvider } from '@tanstack/react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';

const router = createRouter();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		{/* <TrpcProvider> */}
		<ReactQueryProvider>
			<RouterProvider router={router} />
		</ReactQueryProvider>
		{/* </TrpcProvider> */}
	</React.StrictMode>,
);
