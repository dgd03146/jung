import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

/**
 * 비밀번호를 bcrypt 해시로 변환
 */
export const hashPassword = async (password: string): Promise<string> => {
	return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * 비밀번호와 해시 일치 여부 확인
 */
export const verifyPassword = async (
	password: string,
	hash: string,
): Promise<boolean> => {
	return bcrypt.compare(password, hash);
};
