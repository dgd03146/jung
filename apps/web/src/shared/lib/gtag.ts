import { getGA4MeasurementId } from '../config/env';

declare global {
	interface Window {
		gtag: (command: string, ...args: unknown[]) => void;
		dataLayer: unknown[];
	}
}

function isGtagAvailable(): boolean {
	return typeof window !== 'undefined' && typeof window.gtag !== 'undefined';
}

export const pageview = (url: string) => {
	if (!isGtagAvailable()) return;
	window.gtag('config', getGA4MeasurementId(), { page_path: url });
};

export const gtagEvent = (action: string, params: Record<string, unknown>) => {
	if (!isGtagAvailable()) return;
	window.gtag('event', action, params);
};
