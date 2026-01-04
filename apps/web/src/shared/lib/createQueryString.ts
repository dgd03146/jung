export const createQueryString = (
	key: string,
	value: string,
	defaultValue: string,
) => {
	const lowerCaseValue = value.toLowerCase();
	const newParams = new URLSearchParams(key.toString());

	if (lowerCaseValue === defaultValue.toLowerCase()) {
		newParams.delete(key);
	} else {
		newParams.set(key, lowerCaseValue);
	}

	return newParams.toString();
};
