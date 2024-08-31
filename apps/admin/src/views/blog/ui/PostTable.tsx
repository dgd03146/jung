import { Button, Container, Flex, Input } from '@jung/design-system/components';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { TableContent } from './TableContent';

// TODO: 나중에 추가적으로 서버사이드 페이지네이션과 Prefetch 구현 생각해볼것.

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

			<TableContent
				globalFilter={globalFilter}
				setGlobalFilter={setGlobalFilter}
			/>
		</Container>
	);
};

export default PostTable;
