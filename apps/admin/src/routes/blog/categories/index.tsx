import {
	CategoryErrorFallback,
	CategorySkeleton,
} from '@/fsd/features/blog/ui';
import { CategoryManager } from '@/fsd/features/blog/ui/CategoryManager/CategoryManager';
import { ErrorBoundary } from '@jung/shared/ui';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

export const Route = createFileRoute('/blog/categories/')({
	component: CategoryManagerPage,
});

function CategoryManagerPage() {
	const { reset } = useQueryErrorResetBoundary();

	return (
		<ErrorBoundary fallback={CategoryErrorFallback} onReset={reset}>
			<Suspense fallback={<CategorySkeleton />}>
				<CategoryManager />
			</Suspense>
		</ErrorBoundary>
	);
}
