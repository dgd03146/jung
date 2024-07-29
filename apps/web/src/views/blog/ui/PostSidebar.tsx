import { Flex, Stack, Tag, Typography } from '@jung/design-system/components';
import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa';
import * as styles from './PostSidebar.css';

const PostSidebar = () => {
	return (
		<Stack space='12' align='left' flexBasis='72' position='sticky' top={0}>
			<Stack space='2' align='left'>
				<Tag>tags</Tag>
				<Flex columnGap='1'>
					<Tag rounded>travle</Tag>
					<Tag rounded>life</Tag>
					<Tag rounded>style</Tag>
				</Flex>
			</Stack>
			<Stack space='2' align='left'>
				<Tag>previous post</Tag>
				<Link href='/blog/b'>
					<Typography.Text level={3}>
						Is this really right are you sure?...
					</Typography.Text>
				</Link>
			</Stack>
			<Stack space='2' align='left'>
				<Tag>next post</Tag>
				<Link href='/blog/b'>
					<Typography.Text level={3}>
						Is this really right are you sure?...
					</Typography.Text>
				</Link>
			</Stack>
			<Link href='/blog' className={styles.link}>
				<FaChevronLeft size='12' color='#0142C0' />
				<Typography.Text level={3} color='primary'>
					back to the post
				</Typography.Text>
			</Link>
		</Stack>
	);
};

export default PostSidebar;
