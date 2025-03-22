import { Routes } from '@/fsd/shared';
import { Box, Button, Container, Flex } from '@jung/design-system/components';
import { Link, useMatch } from '@tanstack/react-router';
import { FaArrowLeft } from 'react-icons/fa';

const PostEditorSkeleton = () => {
	const editMatch = useMatch({
		from: '/blog/edit/$postId',
		shouldThrow: false,
	});

	const isEditPage = !!editMatch;

	return (
		<Container maxWidth='tablet' marginX='auto' height='full'>
			<Flex direction='column' gap='2'>
				<Flex justifyContent='space-between' alignItems='center'>
					<Link to={Routes.blog.path}>
						<Button variant='ghost' size='zero' prefix={<FaArrowLeft />}>
							Back
						</Button>
					</Link>
					<Flex gap='2' alignItems='center'>
						<Button
							boxShadow='primary'
							variant='ghost'
							disabled
							borderRadius='lg'
						>
							Save
						</Button>
						<Button
							boxShadow='primary'
							variant='ghost'
							disabled
							borderRadius='lg'
						>
							Discard
						</Button>
					</Flex>
					<Button
						textAlign='center'
						variant='secondary'
						disabled
						borderRadius='lg'
					>
						{isEditPage ? 'Update' : 'Create'}
					</Button>
				</Flex>
				<Box background='gray' height='48' borderRadius='lg' />
				<Box background='gray' height='12' borderRadius='lg' width='3/5' />
				<Box background='gray' height='10' borderRadius='lg' width='2/3' />
				<Box background='gray' height='80' borderRadius='lg' />
			</Flex>
		</Container>
	);
};

export default PostEditorSkeleton;
