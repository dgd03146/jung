import type { ToastType } from '@jung/shared/types';
import { useCallback } from 'react';
import { useToastContext } from '../context/ToastContext';

export const useToast = () => {
	const { setToastList } = useToastContext();

	const showToast = useCallback(
		(message: string, type?: ToastType, duration = 3000) => {
			const id = Date.now();
			const newToast = { id, message, type, duration };
			setToastList((prev) => {
				return [...prev, newToast];
			});

			setTimeout(() => {
				setToastList((toasts) => {
					return toasts.filter((toast) => toast.id !== id);
				});
			}, duration);
		},
		[setToastList],
	);

	return showToast;
};
