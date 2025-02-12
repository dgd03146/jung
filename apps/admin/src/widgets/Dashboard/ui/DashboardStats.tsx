import {
	Box,
	Container,
	Flex,
	Grid,
	Stack,
	Typography,
} from '@jung/design-system/components';
import { HiTrendingUp } from 'react-icons/hi';

const DashboardStats = () => {
	const stats = [
		{
			title: 'Popular Post',
			count: 842,
			trend: +15.3,
			period: 'views this week',
			description: 'Next.js App Router 전환기',
		},
		{
			title: 'Trending Photo',
			count: 567,
			trend: +12.8,
			period: 'views this week',
			description: 'Cherry Blossoms at Yeouido',
		},
		{
			title: 'Hot Spot',
			count: 324,
			trend: +23.5,
			period: 'views this week',
			description: 'Common Ground, Seoul',
		},
		{
			title: 'New Messages',
			count: 28,
			trend: +18.2,
			period: 'this week',
			description: 'Guestbook entries',
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
					Weekly Highlights
				</Typography.Text>
			</Box>
			<Grid gridTemplateColumns={{ mobile: '1', tablet: '1/2', laptop: '1/4' }}>
				{stats.map((stat, index) => (
					<Flex
						key={index}
						paddingY='6'
						paddingX='7'
						position='relative'
						transition='fast'
						background={{ hover: 'white100' }}
					>
						<Stack gap='4' flex='1'>
							<Flex gap='3' justify='space-between' align='center'>
								<Typography.Text
									level={4}
									color='primary'
									fontWeight='semibold'
								>
									{stat.count.toLocaleString()}
								</Typography.Text>
								<Typography.Text
									level={4}
									color='primary400'
									fontWeight='semibold'
								>
									{stat.title}
								</Typography.Text>
							</Flex>
							<Stack gap='2'>
								{stat.description && (
									<Typography.SubText level={2}>
										{stat.description}
									</Typography.SubText>
								)}
								<Flex align='center' gap='1.5' paddingY='1.5' paddingX='2.5'>
									<Typography.Text level={2} color='green'>
										<HiTrendingUp size={16} />+{stat.trend}%
									</Typography.Text>
									<Typography.SubText level={2} color='gray300'>
										{stat.period}
									</Typography.SubText>
								</Flex>
							</Stack>
						</Stack>
					</Flex>
				))}
			</Grid>
		</Container>
	);
};

export default DashboardStats;
