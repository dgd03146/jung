import { useToast } from '@jung/design-system/components';

export const useErrorHandler = () => {
	const showToast = useToast();

	return (error: unknown, message: string) => {
		console.error(`${message}:`, error);
		showToast(
			`${message}: ${error instanceof Error ? error.message : 'Unknown error'}`,
		);
	};
};
