import '@/fsd/app/styles/global.css';

import { RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import { createRouter, TrpcReactProvider } from '@/fsd/app';
import { ConfirmDialogProvider } from '@/fsd/shared/lib/useConfirmDialog';

const router = createRouter();

ReactDOM.createRoot(document.getElementById('root')!).render(
	// <React.StrictMode>
	<TrpcReactProvider>
		<ConfirmDialogProvider>
			<RouterProvider router={router} />
		</ConfirmDialogProvider>
	</TrpcReactProvider>,
	// </React.StrictMode>,
);
