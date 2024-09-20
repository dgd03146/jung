import { useCallback } from 'react';
import { useToastContext } from '../context/ToastContext';

export const useToast = () => {
	// FIXME: 성공 실패 CASE들 만들어서 스타일 적용하기

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
