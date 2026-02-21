type MonthFormat = 'short' | 'long';

export function formatDate(
	dateString: string | null,
	monthFormat: MonthFormat = 'short',
): string {
	if (!dateString) return '';
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: monthFormat,
		day: 'numeric',
	});
}
