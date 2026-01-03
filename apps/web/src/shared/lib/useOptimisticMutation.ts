import {
	type MutationKey,
	type QueryKey,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';

type OptimisticMutationContext<TCacheData> = {
	previousData: TCacheData | undefined;
};

type UseOptimisticMutationOptions<
	TData,
	TVariables,
	TCacheData = TData,
> = {
	mutationFn: (variables: TVariables) => Promise<TData>;
	getQueryKey: (variables: TVariables) => QueryKey;
	getOptimisticData: (
		old: TCacheData | undefined,
		variables: TVariables,
	) => TCacheData | undefined;
	mutationKey?: MutationKey;
	onSuccess?: (data: TData, variables: TVariables) => void;
	onError?: (
		error: Error,
		variables: TVariables,
		context: OptimisticMutationContext<TCacheData> | undefined,
	) => void;
};

export function useOptimisticMutation<
	TData,
	TVariables,
	TCacheData = TData,
>({
	mutationFn,
	getQueryKey,
	getOptimisticData,
	mutationKey,
	onSuccess,
	onError,
}: UseOptimisticMutationOptions<TData, TVariables, TCacheData>) {
	const queryClient = useQueryClient();

	return useMutation<
		TData,
		Error,
		TVariables,
		OptimisticMutationContext<TCacheData>
	>({
		mutationFn,
		mutationKey,

		onMutate: async (variables) => {
			const queryKey = getQueryKey(variables);

			await queryClient.cancelQueries({ queryKey });

			const previousData = queryClient.getQueryData<TCacheData>(queryKey);

			queryClient.setQueryData<TCacheData>(queryKey, (old) =>
				getOptimisticData(old, variables),
			);

			return { previousData };
		},

		onError: (error, variables, context) => {
			if (context?.previousData !== undefined) {
				queryClient.setQueryData(getQueryKey(variables), context.previousData);
			}
			onError?.(error, variables, context);
		},

		onSettled: (_data, _error, variables) => {
			const shouldInvalidate = mutationKey
				? queryClient.isMutating({ mutationKey }) === 1
				: true;

			if (shouldInvalidate) {
				queryClient.invalidateQueries({ queryKey: getQueryKey(variables) });
			}
		},

		onSuccess,
	});
}

export type { OptimisticMutationContext };
