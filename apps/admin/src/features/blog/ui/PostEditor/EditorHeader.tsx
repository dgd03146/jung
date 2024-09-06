import { Routes } from '@/fsd/shared';
import { Button, Flex } from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import { FaArrowLeft } from 'react-icons/fa';

type Props = {
	onSave: () => void;
	onDiscard: () => void;
};

const EditorHeader = ({ onSave, onDiscard }: Props) => {
	return (
		<Flex justifyContent='space-between' alignItems='center'>
			<Link to={Routes.blog.path}>
				<Button variant='ghost' size='zero' prefix={<FaArrowLeft />}>
					back
				</Button>
			</Link>
			<Flex gap='2' alignItems='center'>
				<Button
					boxShadow='primary'
					variant='ghost'
					borderRadius='lg'
					onClick={onSave}
				>
					save
				</Button>
				<Button
					boxShadow='primary'
					variant='ghost'
					borderRadius='lg'
					onClick={onDiscard}
				>
					discard
				</Button>
			</Flex>
			<Button variant='secondary' borderRadius='lg'>
				publish
			</Button>
		</Flex>
	);
};

export default EditorHeader;
