import type { CategoryCount } from '@jung/shared/types';
import { ErrorBoundary } from '@jung/shared/ui';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import {
	CategoryErrorFallback,
	CategorySkeleton,
} from '@/fsd/features/blog/ui';
import { CategoryManager } from '@/fsd/shared/ui/CategoryManager/CategoryManager';

export const Route = createFileRoute('/places/categories/')({
	component: CategoryManagerPage,
});

const handleUpdateOrder = (items: CategoryCount[]) => {
	// Place categories order update
	console.log('Updating place categories order:', items);
};

function CategoryManagerPage() {
	const { reset } = useQueryErrorResetBoundary();

	return (
		<ErrorBoundary fallback={CategoryErrorFallback} onReset={reset}>
			<Suspense fallback={<CategorySkeleton />}>
				<CategoryManager onUpdateOrder={handleUpdateOrder} />
			</Suspense>
		</ErrorBoundary>
	);
}
