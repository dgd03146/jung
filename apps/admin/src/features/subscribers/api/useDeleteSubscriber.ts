import { useToast } from '@jung/design-system/components';
import type { SupabaseClient } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { subscriberKeys, supabase } from '@/fsd/shared';

// subscribers 테이블에 anon SELECT 정책이 없어 gen types에 미포함 → 타입 어서션 사용
const db = supabase as unknown as SupabaseClient;

export const useDeleteSubscriber = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: async (id: string) => {
			const { error } = await db.from('subscribers').delete().eq('id', id);

			if (error) {
				throw new Error(`Failed to delete subscriber: ${error.message}`);
			}

			return true;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: subscriberKeys.lists(),
			});
			showToast('Subscriber deleted successfully!', 'success');
		},
		onError: (error: Error) => {
			showToast(`Failed to delete subscriber: ${error.message}`, 'error');
		},
	});
};
