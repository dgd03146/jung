import { Flex, Stack, Typography } from '@jung/design-system/components';
import Image from 'next/image';

const PostHeader = () => {
	return (
		<Flex alignItems='center' columnGap='20'>
			<Image
				src={
					'https://images.unsplash.com/photo-1721197709662-615338eda4be?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
				}
				alt='Featured Image'
				width={288}
				height={288}
				style={{ borderRadius: '16px' }}
				priority
			/>
			<Stack space={'2'} align={'left'}>
				<Typography.Text level={3} color='primary'>
					Sunday, March 10, 2024
				</Typography.Text>
				<Typography.Heading>This is title title tiltitlte</Typography.Heading>
			</Stack>
		</Flex>
	);
};

export default PostHeader;
