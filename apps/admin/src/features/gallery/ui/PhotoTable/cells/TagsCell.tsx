import { Typography } from '@jung/design-system/components';

interface TagsCellProps {
	tags?: string[];
}

export const TagsCell = ({ tags }: TagsCellProps) => (
	<Typography.Text level={3}>{tags?.join(', ') || '-'}</Typography.Text>
);
