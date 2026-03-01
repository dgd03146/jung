import { LoadingSpinner } from '@/fsd/shared/ui';

export default function Loading() {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '50vh',
			}}
		>
			<LoadingSpinner size='large' />
		</div>
	);
}
