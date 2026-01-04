import { usePortal } from '@jung/shared/hooks';
import ReactDOM from 'react-dom';
import { Box } from '../Box/Box';
import { useToastContext } from './context/ToastContext';
import { Toast } from './Toast';
import * as styles from './ToastContainer.css';

export const ToastContainer = () => {
	const { toastList } = useToastContext();
	const portalRoot = usePortal('toast-portal');

	return portalRoot
		? ReactDOM.createPortal(
				<Box className={styles.container}>
					{toastList.map((toast) => {
						return (
							<Toast key={toast.id} message={toast.message} type={toast.type} />
						);
					})}
				</Box>,
				portalRoot,
			)
		: null;
};
