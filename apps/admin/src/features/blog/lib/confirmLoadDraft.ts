export const confirmLoadDraft = (lastSaved?: string) => {
	if (!lastSaved) return false;
	const message = `There is a saved draft from ${lastSaved}. Would you like to load it?`;
	return window.confirm(message);
};
