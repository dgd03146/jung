import * as styles from './ToastContainer.css';

import { usePortal } from '@jung/shared/hooks';
import ReactDOM from 'react-dom';
import { Box } from '../Box/Box';
import { Toast } from './Toast';
import { useToastContext } from './context/ToastContext';

export const ToastContainer = () => {
	const { toastList } = useToastContext();
	const portalRoot = usePortal('toast-portal');

	return portalRoot
		? ReactDOM.createPortal(
				<Box className={styles.container}>
					{toastList.map((toast) => {
						console.log('Rendering toast:', toast);
						return (
							<Toast key={toast.id} message={toast.message} type={toast.type} />
						);
					})}
				</Box>,
				portalRoot,
		  )
		: null;
};
