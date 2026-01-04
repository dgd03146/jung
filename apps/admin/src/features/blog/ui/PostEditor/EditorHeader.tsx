import { Box, Button, Flex } from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import { HiArrowLeft, HiSave, HiX } from 'react-icons/hi';
import { HiPaperAirplane } from 'react-icons/hi2';
import { Routes } from '@/fsd/shared';

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
	return (
		<Box width='full' marginTop='2' marginBottom='6'>
			<Flex display='flex' justifyContent='space-between' alignItems='center'>
				<Link to={Routes.blog.path}>
					<Button
						variant='outline'
						color='primary'
						size='sm'
						borderRadius='md'
						prefix={<HiArrowLeft size={16} />}
					>
						Posts
					</Button>
				</Link>

				<Flex display='flex' gap={{ base: '1', mobile: '2' }}>
					<Button
						variant='outline'
						color='primary'
						size='sm'
						borderRadius='md'
						prefix={<HiSave size={16} />}
						onClick={onSave}
					>
						Draft
					</Button>
					<Button
						variant='outline'
						size='sm'
						borderRadius='md'
						prefix={<HiX size={16} />}
						onClick={onDiscard}
					>
						Discard
					</Button>
					<Button
						size='sm'
						borderRadius='md'
						prefix={
							<Box
								as={HiPaperAirplane}
								size={16}
								style={{ transform: 'rotate(90deg)' }}
							/>
						}
						onClick={onSubmit}
					>
						{isSubmitting
							? isEditMode
								? 'Updating...'
								: 'Publishing...'
							: isEditMode
								? 'Update'
								: 'Publish'}
					</Button>
				</Flex>
			</Flex>
		</Box>
	);
};

export default EditorHeader;
