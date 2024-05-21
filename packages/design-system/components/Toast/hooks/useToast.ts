import { useCallback } from 'react';
import { useToastContext } from '../context/ToastContext';

export const useToast = () => {
	const { setToastList } = useToastContext();
	const showToast = useCallback(
		(message: string, duration = 1300) => {
			const id = new Date().getTime();
			const newToast = { id, message, duration };
			setToastList((prev) => [...prev, newToast]);

			setTimeout(() => {
				setToastList((toasts) => toasts.filter((toast) => toast.id !== id));
			}, duration);
		},
		[setToastList],
	);

	return showToast;
};
