import type { ComponentType, FC, ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback: (error: Error) => ReactNode;
	onReset?: () => void;
}

export const ErrorBoundary: FC<ErrorBoundaryProps> = ({
	children,
	fallback,
	onReset,
}) => {
	const handleError = (error: Error) => {
		// 에러 로깅, 모니터링 서비스에 전송
		console.error('An error occurred:', error);
	};

	const handleReset = () => {
		// 필요한 상태 초기화, 캐시 클리어 등
		console.log('Error boundary reset');
		onReset?.();
	};

	// React 19 호환성을 위한 타입 캐스팅
	const BoundaryComponent = ReactErrorBoundary as unknown as ComponentType<{
		FallbackComponent: ComponentType<{ error: Error }>;
		onError: (error: Error) => void;
		onReset: () => void;
		children: ReactNode;
	}>;

	return (
		<BoundaryComponent
			FallbackComponent={({ error }) => <>{fallback(error)}</>}
			onError={handleError}
			onReset={handleReset}
		>
			{children}
		</BoundaryComponent>
	);
};
