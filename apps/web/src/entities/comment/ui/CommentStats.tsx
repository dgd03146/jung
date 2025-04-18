import { Flex, Typography } from '@jung/design-system/components';
import { FaRegComment, FaRegHeart } from 'react-icons/fa';

interface CommentStatsProps {
	commentCount: number;
	likeCount: number;
}

export const CommentStats = ({
	commentCount,
	likeCount,
}: CommentStatsProps) => (
	<Flex columnGap='4' alignItems='center' marginBottom='4'>
		<Flex alignItems='center' columnGap='1'>
			<FaRegComment size={18} color='#0142C0' />
			<Typography.SubText level={2} color='primary'>
				{commentCount}
			</Typography.SubText>
		</Flex>
		<Flex alignItems='center' columnGap='1'>
			<FaRegHeart size={18} color='#0142C0' />
			<Typography.SubText level={2} color='primary'>
				{likeCount}
			</Typography.SubText>
		</Flex>
	</Flex>
);
