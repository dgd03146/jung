import { Routes } from '@/fsd/shared';
import { Button, Flex } from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import { FaArrowLeft } from 'react-icons/fa';

type Props = {
	onSave: () => void;
	onDiscard: () => void;
	onSubmit: () => void;
	isSubmitting: boolean;
	isEditMode: boolean;
};

const EditorHeader = ({
	onSave,
	onDiscard,
	onSubmit,
	isSubmitting,
	isEditMode,
}: Props) => {
	const getButtonText = () => {
		if (isEditMode) {
			return isSubmitting ? 'Updating' : 'Update';
		}
		return isSubmitting ? 'Creating' : 'Create';
	};

	return (
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
					borderRadius='lg'
					onClick={onSave}
				>
					Save
				</Button>
				<Button
					boxShadow='primary'
					variant='ghost'
					borderRadius='lg'
					onClick={onDiscard}
				>
					Discard
				</Button>
			</Flex>
			<Button
				textAlign='center'
				variant='secondary'
				borderRadius='lg'
				onClick={onSubmit}
				loading={isSubmitting}
				disabled={isSubmitting}
			>
				{getButtonText()}
			</Button>
		</Flex>
	);
};

export default EditorHeader;
