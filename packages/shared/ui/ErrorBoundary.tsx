import type { FC, ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback: (error: Error) => ReactNode;
}

export const ErrorBoundary: FC<ErrorBoundaryProps> = ({
	children,
	fallback,
}) => {
	// 에러 발생 시 호출되는 핸들러
	const handleError = (error: Error) => {
		// 에러 로깅, 모니터링 서비스에 전송
		console.error('An error occurred:', error);
	};

	// 에러 초기화 시 호출되는 핸들러
	const handleReset = () => {
		// 필요한 상태 초기화, 캐시 클리어 등
		console.log('Error boundary reset');
	};

	return (
		<ReactErrorBoundary
			FallbackComponent={({ error }) => fallback(error)} // 수정된 부분
			onError={handleError}
			onReset={handleReset}
		>
			{children}
		</ReactErrorBoundary>
	);
};
