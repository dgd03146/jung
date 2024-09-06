import PostEditor from './PostEditor';

const PostCreatePage = () => {
	const handleSave = (content: string) => {
		// 여기에 저장 로직 구현 (예: API 호출)
		console.log('Saving content:', content);
	};

	return <PostEditor />;
};

export default PostCreatePage;
