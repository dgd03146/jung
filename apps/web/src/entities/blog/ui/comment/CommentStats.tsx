import { Typography } from '@jung/design-system/components';

interface CommentStatsProps {
	commentCount: number;
}

export const CommentStats = ({ commentCount }: CommentStatsProps) => (
	<Typography.SubText level={2} color='primary' marginBottom='2'>
		{commentCount} {commentCount > 1 ? 'Comments' : 'Comment'}
	</Typography.SubText>
);
