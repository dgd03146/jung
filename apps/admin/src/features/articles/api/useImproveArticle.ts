import { useToast } from '@jung/design-system/components';
import { useMutation } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/app';

export const useImproveArticle = () => {
	const showToast = useToast();
	const trpc = useTRPC();

	return useMutation(
		trpc.article.improveArticle.mutationOptions({
			onSuccess: () => {
				showToast('AI가 내용을 개선했습니다!', 'success');
			},
			onError: (error) => {
				console.error('AI improve error:', error);
				showToast('AI 개선에 실패했습니다. 다시 시도해주세요.', 'error');
			},
		}),
	);
};
