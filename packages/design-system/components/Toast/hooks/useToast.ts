import { ToastType } from '@jung/shared/types';
import { useCallback } from 'react';
import { useToastContext } from '../context/ToastContext';

export const useToast = () => {
	const { setToastList } = useToastContext();

	const showToast = useCallback(
		(message: string, type: ToastType = ToastType.SUCCESS, duration = 3000) => {
			const id = new Date().getTime();
			const newToast = { id, message, type, duration };
			setToastList((prev) => [...prev, newToast]);

			setTimeout(() => {
				setToastList((toasts) => toasts.filter((toast) => toast.id !== id));
			}, duration);
		},
		[setToastList],
	);

	return showToast;
};
