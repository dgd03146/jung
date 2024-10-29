import { Stack, Typography } from '@jung/design-system/components';

const BlockNoteErrorFallback = ({
	error,
	// resetErrorBoundary,
}: {
	error: Error;
	// resetErrorBoundary: () => void;
}) => {
	return (
		<Stack space='4' align='center' padding='6'>
			<Typography.Text level={3} color='error'>
				Failed to load post content
			</Typography.Text>
			<Typography.SubText level={2} color='gray'>
				{error.message}
			</Typography.SubText>
		</Stack>
	);
};

export default BlockNoteErrorFallback;
