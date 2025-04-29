import { Typography } from '@jung/design-system/components';

interface CommentStatsProps {
	commentCount: number;
}

export const CommentStats = ({ commentCount }: CommentStatsProps) => (
	<Typography.Text level={2} color='primary'>
		{commentCount} {commentCount > 1 ? 'Comments' : 'Comment'}
	</Typography.Text>
);
