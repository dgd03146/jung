export const getLocalUrl = (): string => {
	return 'http://localhost:3000';
};

export const getApiUrl = (): string => {
	return process.env.NEXT_PUBLIC_API_URL || '';
};

export const getEnvironment = (): string => {
	return process.env.NODE_ENV || 'development';
};

export const isProduction = (): boolean => {
	return getEnvironment() === 'production';
};

export const isDevelopment = (): boolean => {
	return getEnvironment() === 'development';
};

export const getGoogleApiKey = (): string => {
	return process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '';
};

export const getSupabaseUrl = (): string => {
	return process.env.NEXT_PUBLIC_SUPABASE_URL || '';
};

export const getSupabaseAnonKey = (): string => {
	return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
};

export const getKakaoRestApiKey = (): string => {
	return process.env.KAKAO_REST_API_KEY || '';
};

export const getKakaoClientSecret = (): string => {
	return process.env.KAKAO_CLIENT_SECRET || '';
};

export const getKakaoJavascriptKey = (): string => {
	return process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY || '';
};

export const getGoogleMapsApiKey = (): string => {
	return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
};

export const getGoogleVerificationCode = (): string => {
	return process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE || '';
};

export const getResendApiKey = (): string => {
	return process.env.NEXT_PUBLIC_RESEND_API_KEY || '';
};

export const getResendEmailFrom = (): string => {
	return process.env.NEXT_PUBLIC_RESEND_EMAIL_FROM || '';
};
