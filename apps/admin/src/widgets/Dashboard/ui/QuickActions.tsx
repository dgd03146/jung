import { Routes } from '@/fsd/shared';
import {
	Box,
	Container,
	Flex,
	Grid,
	Stack,
	Typography,
} from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import { MdAdd, MdLocationOn, MdSettings, MdUpload } from 'react-icons/md';

const QuickActions = () => {
	const actions = [
		{
			title: 'Create Post',
			description: 'Write a new blog post',
			icon: <MdAdd size={20} />,
			to: `${Routes.blog.path}/create`,
		},
		{
			title: 'Upload Images',
			description: 'Add new images to gallery',
			icon: <MdUpload size={20} />,
			to: `${Routes.gallery.path}/upload`,
		},
		{
			title: 'Add Location',
			description: 'Register new spot',
			icon: <MdLocationOn size={20} />,
			to: `${Routes.spots.path}/create`,
		},
		{
			title: 'Settings',
			description: 'Manage your preferences',
			icon: <MdSettings size={20} />,
			to: '/settings',
		},
	];

	return (
		<Container boxShadow='primary' background='white' borderRadius='2xl'>
			<Box
				padding='4'
				borderBottomWidth='hairline'
				borderColor='white300'
				borderStyle='solid'
			>
				<Typography.Text level={3} color='primary' fontWeight='semibold'>
					Quick Actions
				</Typography.Text>
			</Box>
			<Grid
				gridTemplateColumns={{ mobile: '1', tablet: '1/2', laptop: '1/4' }}
				padding='1'
				gap='1'
			>
				{actions.map((action, index) => (
					<Link key={index} to={action.to}>
						<Flex
							align='center'
							gap='4'
							padding='4'
							background={{ hover: 'primary50' }}
						>
							<Flex
								align='center'
								justify='center'
								width='10'
								height='10'
								background='white100'
								color='primary'
								borderRadius='lg'
							>
								{action.icon}
							</Flex>
							<Stack gap='2'>
								<Typography.Text
									level={4}
									color='primary'
									fontWeight='semibold'
								>
									{action.title}
								</Typography.Text>
								<Typography.SubText level={1} color='primary300'>
									{action.description}
								</Typography.SubText>
							</Stack>
						</Flex>
					</Link>
				))}
			</Grid>
		</Container>
	);
};

export default QuickActions;
