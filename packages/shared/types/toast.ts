export enum ToastType {
	SUCCESS = 'success',
	ERROR = 'error',
	INFO = 'info',
	WARNING = 'warning',
}

export interface ToastProps {
	id: number;
	message: string;
	type: ToastType;
	duration: number;
}
