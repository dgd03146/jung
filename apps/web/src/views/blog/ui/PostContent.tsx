import Comments from './Comments';

const PostContent = () => {
	return (
		<div>
			<div>Content</div>
			{/* TODO: Comments Suspense로 */}
			<Comments />
		</div>
	);
};

export default PostContent;
