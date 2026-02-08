/**
 * Wraps a tRPC translate mutation with graceful degradation.
 * If translation fails, returns undefined so the core operation
 * (create/update photo/place) can proceed without translations.
 */
export async function translateWithFallback<TInput, TResult>(
	mutateAsync: (input: TInput) => Promise<TResult>,
	input: TInput,
): Promise<TResult | undefined> {
	try {
		return await mutateAsync(input);
	} catch (error) {
		console.warn('Translation failed, proceeding without translations:', error);
		return undefined;
	}
}
