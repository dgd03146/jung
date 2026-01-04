export const formatRelativeTime = (dateString: string): string => {
	const date = new Date(dateString);
	const now = new Date();

	const diffInMilliseconds = Math.abs(date.getTime() - now.getTime());
	if (diffInMilliseconds < 3000) {
		return 'now';
	}

	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diffInSeconds < 0) {
		return 'now';
	}

	const diffInMinutes = Math.floor(diffInSeconds / 60);
	const diffInHours = Math.floor(diffInMinutes / 60);
	const diffInDays = Math.floor(diffInHours / 24);
	const diffInWeeks = Math.floor(diffInDays / 7);

	if (diffInMinutes < 1) {
		return 'now';
	}
	if (diffInMinutes < 60) {
		return `${diffInMinutes}m`;
	}
	if (diffInHours < 24) {
		return `${diffInHours}h`;
	}
	if (diffInDays < 7) {
		return `${diffInDays}d`;
	}
	if (diffInWeeks < 20) {
		return `${diffInWeeks}w`;
	}

	return new Intl.DateTimeFormat('en-GB', {
		month: 'short',
		day: 'numeric',
		timeZone: 'UTC',
	}).format(date);
};

export const getFullDate = (dateString: string): string => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('en-GB', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC',
	}).format(date);
};

export const formatDetailedDate = (dateString: string): string => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('en-GB', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		timeZone: 'UTC',
	}).format(date);
};

export const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('en-GB', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		timeZone: 'UTC',
	}).format(date);
};
