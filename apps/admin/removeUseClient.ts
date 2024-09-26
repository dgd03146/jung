import { createFilter } from 'vite';

export function removeUseClient() {
	const filter = createFilter(/.*\.(js|ts|jsx|tsx)$/);

	return {
		name: 'remove-use-client',

		transform(code: string, id: string) {
			if (!filter(id)) {
				return null;
			}

			const newCode = code.replace(/['"]use client['"];\s*/g, '');

			return { code: newCode, map: null };
		},
	};
}
