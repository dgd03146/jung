import type { PostgrestError } from '@supabase/supabase-js';

export class ApiError extends Error {
	constructor(
		message: string,
		public code: string,
		public details?: string,
		public hint?: string,
	) {
		super(message);
		this.name = 'ApiError';
	}

	static fromPostgrestError(error: PostgrestError): ApiError {
		return new ApiError(error.message, error.code, error.details, error.hint);
	}
}
