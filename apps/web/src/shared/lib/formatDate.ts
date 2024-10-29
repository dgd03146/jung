type Interval = {
	label: string;
	seconds: number;
};

export const formatRelativeTime = (dateString: string): string => {
	const date = new Date(dateString);
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	const diffInHours = Math.floor(diffInMinutes / 60);
	const diffInDays = Math.floor(diffInHours / 24);
	const diffInWeeks = Math.floor(diffInDays / 7);

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

	return date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
};

export const getFullDate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-GB', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};

export const formatDetailedDate = (dateString: string): string => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('ko-KR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	}).format(date);
};

export const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('en-GB', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		// hour: '2-digit',
		// minute: '2-digit',
		hour12: false,
	}).format(date);
};
