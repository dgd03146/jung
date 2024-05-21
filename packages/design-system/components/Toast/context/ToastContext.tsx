import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	createContext,
	useContext,
	useMemo,
	useState,
} from 'react';

type ToastContent = {
	message: string;
	duration: number;
	id: number;
};

type ToastContextState = {
	toastList: ToastContent[];
	setToastList: Dispatch<SetStateAction<ToastContent[]>>;
};

export const ToastContext = createContext<ToastContextState | null>(null);

export const useToastContext = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error('useToastContext must be used within a ToastProvider');
	}
	return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
	const [toastList, setToastList] = useState<ToastContent[]>([]);
	const value = useMemo(
		() => ({ toastList, setToastList }),
		[toastList, setToastList],
	);

	return (
		<ToastContext.Provider value={value}>{children}</ToastContext.Provider>
	);
};
