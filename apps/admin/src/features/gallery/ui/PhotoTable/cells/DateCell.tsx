import { Typography } from '@jung/design-system/components';

interface DateCellProps {
	date: string;
}

export const DateCell = ({ date }: DateCellProps) => (
	<Typography.Text level={3}>
		{new Date(date).toLocaleDateString('ko-KR')}
	</Typography.Text>
);
