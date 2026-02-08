const TIME_THRESHOLDS = {
	SAME_TIME_MS: 3000,
	MINUTES_PER_HOUR: 60,
	HOURS_PER_DAY: 24,
	DAYS_PER_WEEK: 7,
	MAX_WEEKS_DISPLAY: 20,
} as const;

export const formatRelativeTime = (dateString: string): string => {
	const date = new Date(dateString);
	const now = new Date();

	const diffInMilliseconds = Math.abs(date.getTime() - now.getTime());
	if (diffInMilliseconds < TIME_THRESHOLDS.SAME_TIME_MS) {
		return 'now';
	}

	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diffInSeconds < 0) {
		return 'now';
	}

	const diffInMinutes = Math.floor(
		diffInSeconds / TIME_THRESHOLDS.MINUTES_PER_HOUR,
	);
	const diffInHours = Math.floor(
		diffInMinutes / TIME_THRESHOLDS.MINUTES_PER_HOUR,
	);
	const diffInDays = Math.floor(diffInHours / TIME_THRESHOLDS.HOURS_PER_DAY);
	const diffInWeeks = Math.floor(diffInDays / TIME_THRESHOLDS.DAYS_PER_WEEK);

	if (diffInMinutes < 1) {
		return 'now';
	}
	if (diffInMinutes < TIME_THRESHOLDS.MINUTES_PER_HOUR) {
		return `${diffInMinutes}m`;
	}
	if (diffInHours < TIME_THRESHOLDS.HOURS_PER_DAY) {
		return `${diffInHours}h`;
	}
	if (diffInDays < TIME_THRESHOLDS.DAYS_PER_WEEK) {
		return `${diffInDays}d`;
	}
	if (diffInWeeks < TIME_THRESHOLDS.MAX_WEEKS_DISPLAY) {
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
