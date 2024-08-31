import { Button, Container, Flex, Input } from '@jung/design-system/components';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { FaPlus } from 'react-icons/fa';
import ErrorFallback from './ErrorFallback';
import { TableContent } from './TableContent';
import TableSkeleton from './TableSkeleton';

const PostTable = () => {
	const [globalFilter, setGlobalFilter] = useState('');

	return (
		<Container marginTop='1'>
			<Flex justifyContent='space-between' marginBottom='6'>
				<Input
					boxShadow='primary'
					border='none'
					rounded
					value={globalFilter ?? ''}
					onChange={(e) => setGlobalFilter(e.target.value)}
					placeholder='search...'
				/>
				<Button boxShadow='primary' border='none' rounded>
					<FaPlus /> new
				</Button>
			</Flex>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<Suspense fallback={<TableSkeleton />}>
					<TableContent
						globalFilter={globalFilter}
						setGlobalFilter={setGlobalFilter}
					/>
				</Suspense>
			</ErrorBoundary>
		</Container>
	);
};

export default PostTable;
