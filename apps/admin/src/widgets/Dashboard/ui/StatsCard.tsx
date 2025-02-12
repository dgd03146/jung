import { Box, Card, Flex, Typography } from '@jung/design-system/components';
import { BiTrendingDown, BiTrendingUp } from 'react-icons/bi';

interface StatsCardProps {
	title: string;
	count: number;
	icon: React.ReactNode;
	trend: number;
	period: string;
}

const StatsCard = ({ title, count, icon, trend, period }: StatsCardProps) => {
	const isTrendUp = trend > 0;

	return (
		<Card padding='6'>
			<Flex justifyContent='space-between' alignItems='center' marginBottom='4'>
				<Typography.Text level={2} fontWeight='medium'>
					{title}
				</Typography.Text>
				<Box color='primary'>{icon}</Box>
			</Flex>

			<Typography.Heading level={2} marginBottom='2'>
				{count.toLocaleString()}
			</Typography.Heading>

			<Flex alignItems='center' columnGap='2'>
				<Box color={isTrendUp ? 'success' : 'error'}>
					{isTrendUp ? <BiTrendingUp /> : <BiTrendingDown />}
				</Box>
				<Typography.Text level={1} color={isTrendUp ? 'success' : 'error'}>
					{Math.abs(trend)}
				</Typography.Text>
				<Typography.Text level={1} color='gray'>
					{period}
				</Typography.Text>
			</Flex>
		</Card>
	);
};

export default StatsCard;
