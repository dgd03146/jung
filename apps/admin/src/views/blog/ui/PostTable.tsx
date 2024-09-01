import type { PostFilters } from '@/fsd/features/blog/model/postKeys';
import { Button, Container, Flex, Input } from '@jung/design-system/components';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { type ChangeEvent, useCallback, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDebouncedCallback } from 'use-debounce';
import { TableContent } from './TableContent';

const PostTable = () => {
	const searchParams: PostFilters = useSearch({ from: '/blog/' });
	const navigate = useNavigate();

	const [filter, setFilter] = useState(searchParams.filter ?? '');

	const debouncedNavigate = useDebouncedCallback((value: string) => {
		navigate({ search: (prev) => ({ ...prev, filter: value || '', page: 0 }) });
	}, 300);

	const handleFilterChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value;
			setFilter(newValue);
			debouncedNavigate(newValue);
		},
		[debouncedNavigate],
	);

	return (
		<Container marginTop='1'>
			<Flex justifyContent='space-between' marginBottom='6'>
				<Input
					boxShadow='primary'
					border='none'
					rounded
					value={filter ?? ''}
					onChange={handleFilterChange}
					placeholder='search...'
				/>
				<Button boxShadow='primary' border='none' rounded>
					<FaPlus /> new
				</Button>
			</Flex>
			<TableContent />
		</Container>
	);
};

export default PostTable;
