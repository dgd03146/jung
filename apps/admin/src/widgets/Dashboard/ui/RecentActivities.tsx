import {
	Box,
	Container,
	Flex,
	Stack,
	Tag,
	Typography,
} from '@jung/design-system/components';
import { MdAddPhotoAlternate, MdEdit, MdLocationOn } from 'react-icons/md';

const RecentActivities = () => {
	const activities = [
		{
			id: 1,
			title: 'New Blog Post Created',
			description: 'React 18 Updates Summary',
			time: '2024-03-15T10:30:00',
			icon: <MdEdit size={20} />,
			type: 'blog',
		},
		{
			id: 2,
			title: 'Images Added to Gallery',
			description: 'Spring 2024 Collection (5 images)',
			time: '2024-03-15T09:15:00',
			icon: <MdAddPhotoAlternate size={20} />,
			type: 'gallery',
		},
		{
			id: 3,
			title: 'New Spot Registered',
			description: 'Seoul Forest Café',
			time: '2024-03-15T08:45:00',
			icon: <MdLocationOn size={20} />,
			type: 'spot',
		},
		{
			id: 4,
			title: 'New Spot Registered',
			description: 'Seoul Forest Café',
			time: '2024-03-15T08:45:00',
			icon: <MdLocationOn size={20} />,
			type: 'spot',
		},
		{
			id: 5,
			title: 'New Spot Registered',
			description: 'Seoul Forest Café',
			time: '2024-03-15T08:45:00',
			icon: <MdLocationOn size={20} />,
			type: 'spot',
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
					Recent Activities
				</Typography.Text>
			</Box>
			<Box paddingX='4'>
				{activities.map((activity) => (
					<Flex
						key={activity.id}
						gap='3'
						paddingY='3'
						borderBottomWidth='hairline'
						borderColor='white300'
						borderStyle='solid'
					>
						<Flex
							align='center'
							justify='center'
							width='8'
							height='8'
							background='primary50'
							color='primary'
							borderRadius='lg'
							flexShrink={0}
						>
							{activity.icon}
						</Flex>
						<Stack flex='1' gap='3'>
							<Typography.Text level={4} color='primary' fontWeight='semibold'>
								{activity.title}
							</Typography.Text>
							<Flex gap='2' align='center'>
								<Tag variant='secondary'>
									<Typography.SubText level={1} fontWeight='medium'>
										{activity.type}
									</Typography.SubText>
								</Tag>
								<Typography.SubText level={1} color='primary300'>
									{activity.description}
								</Typography.SubText>
								<Typography.SubText level={1} color='primary'>
									•
								</Typography.SubText>
								<Typography.SubText level={1} color='primary200'>
									{activity.time}
								</Typography.SubText>
							</Flex>
						</Stack>
					</Flex>
				))}
			</Box>
		</Container>
	);
};

export default RecentActivities;
