import { Flex, Stack, Typography } from '@jung/design-system/components';
import Image from 'next/image';

interface Props {
	imagesrc: string;
	date: string;
	title: string;
}

const PostHeader = ({ title, date, imagesrc }: Props) => {
	return (
		<Flex alignItems='center' columnGap='20'>
			<Image
				src={imagesrc}
				alt='Featured Image'
				width={288}
				height={288}
				style={{ borderRadius: '16px' }}
				priority
			/>
			<Stack space={'2'} align={'left'}>
				<Typography.Text level={3} color='primary'>
					{date}
				</Typography.Text>
				<Typography.Heading>{title}</Typography.Heading>
			</Stack>
		</Flex>
	);
};

export default PostHeader;
