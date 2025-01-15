import {
	CategoryErrorFallback,
	CategorySkeleton,
} from '@/fsd/features/blog/ui';
import { CategoryManager } from '@/fsd/shared/ui/CategoryManager/CategoryManager';
import type { CategoryWithCount } from '@jung/shared/types';
import { ErrorBoundary } from '@jung/shared/ui';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

export const Route = createFileRoute('/blog/categories/')({
	component: CategoryManagerPage,
});

const handleUpdateOrder = (items: CategoryWithCount[]) => {
	// Blog 카테고리 순서 업데이트
	console.log('Updating blog categories order:', items);
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
