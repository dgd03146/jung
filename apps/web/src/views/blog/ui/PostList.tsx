import { Container, Grid } from '@jung/design-system/components';
import Post from './Post';

const postData = [
	{
		imageSrc:
			'https://images.unsplash.com/photo-1721197709662-615338eda4be?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		date: '2022.07.06',
		tags: ['hihi', 'hihi'],
		title: 'How was your day today?...',
		description:
			"today is weatehr is very nice. i can't be happy anymore... i love it today",
		link: '/blog/a',
	},
	{
		imageSrc:
			'https://images.unsplash.com/photo-1721197709662-615338eda4be?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		date: '2022.07.06',
		tags: ['hihi', 'hihi'],
		title: '오늘하루는 어땠는가?!?!',
		description:
			"today is weatehr is very nice. i can't be happy anymore... i love it todayasdasdasdasdasdasds",
		link: '/blog/a',
	},
	{
		imageSrc:
			'https://images.unsplash.com/photo-1721197709662-615338eda4be?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		date: '2022.07.06',
		tags: ['hihi', 'hihi'],
		title: '오늘하루는 어땠는가?!?!',
		description:
			"today is weatehr is very nice. i can't be happy anymore... i love it todayasdasdasdasdasdasds",
		link: '/blog/a',
	},
];

const PostList = () => {
	return (
		<Container marginY='12'>
			<Grid
				columnGap='4'
				rowGap='8'
				gridTemplateColumns={{
					mobile: '1',
					tablet: '1/2',
					laptop: '1/3',
				}}
			>
				{postData.map((post, index) => (
					<Post key={post.title} index={index} {...post} />
				))}
			</Grid>
		</Container>
	);
};

export default PostList;
