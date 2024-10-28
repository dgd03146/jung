export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
	id: number;
	message: string;
	type?: ToastType;
	duration: number;
}
