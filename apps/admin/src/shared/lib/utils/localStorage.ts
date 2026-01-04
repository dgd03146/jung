type StorageValue = string | number | boolean | object | null;

const storage = {
	get: <T extends StorageValue>(key: string): T | null => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : null;
		} catch (error) {
			// FIXME: 에러처리 Toast 보여주는 식으로?
			console.error('Error getting data from localStorage:', error);
			return null;
		}
	},
	set: <T extends StorageValue>(key: string, value: T): void => {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.error('Error setting data in localStorage:', error);
		}
	},
	remove: (key: string): void => {
		try {
			localStorage.removeItem(key);
		} catch (error) {
			console.error('Error removing data from localStorage:', error);
		}
	},
};

export default storage;
