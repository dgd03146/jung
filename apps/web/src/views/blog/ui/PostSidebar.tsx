import { Flex, Stack, Tag, Typography } from '@jung/design-system/components';
import Link from 'next/link';
import { FaChevronLeft, FaTag } from 'react-icons/fa';
import * as styles from './PostSidebar.css';

const PostSidebar = ({ tags }: { tags: string[] }) => {
	return (
		<Stack
			space='12'
			align='left'
			minWidth='60'
			position='sticky'
			top={0}
			display={{ mobile: 'none', laptop: 'flex' }}
		>
			<Stack
				space='2'
				align='left'
				minWidth='60'
				borderBottomWidth='hairline'
				borderColor='gray'
				borderStyle='solid'
				paddingBottom='8'
			>
				<Typography.SubText level={2} color='primary'>
					Tags
				</Typography.SubText>
				<Flex columnGap='2'>
					{tags.map((tag) => (
						<Tag
							key={tag}
							color='primary'
							variant='ghost'
							display='flex'
							alignItems='center'
							borderRadius='md'
							boxShadow='primary'
						>
							<FaTag style={{ marginRight: '6px', fontSize: '0.75em' }} />
							{tag}
						</Tag>
					))}
				</Flex>
			</Stack>
			<Stack
				space='1'
				align='left'
				borderBottomWidth='hairline'
				borderColor='gray'
				borderStyle='solid'
				paddingBottom='8'
			>
				<Typography.SubText level={2} color='primary'>
					Previous Post
				</Typography.SubText>
				<Link href='/blog/b'>
					<Typography.Text level={3}>
						Is this really right are you sure?...
					</Typography.Text>
				</Link>
			</Stack>
			<Stack
				space='1'
				align='left'
				borderBottomWidth='hairline'
				borderColor='gray'
				borderStyle='solid'
				paddingBottom='8'
			>
				<Typography.SubText level={2} color='primary'>
					Next Post
				</Typography.SubText>
				<Link href='/blog/b'>
					<Typography.Text level={3}>
						Is this really right are you sure?...
					</Typography.Text>
				</Link>
			</Stack>
			<Link href='/blog' className={styles.link}>
				<FaChevronLeft size='12' color='#0142C0' />
				<Typography.Text level={3} color='primary'>
					Back to the post
				</Typography.Text>
			</Link>
		</Stack>
	);
};

export default PostSidebar;
