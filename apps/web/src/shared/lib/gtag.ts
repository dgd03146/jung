import { getGA4MeasurementId } from '../config/env';

declare global {
	interface Window {
		gtag: (command: string, ...args: unknown[]) => void;
		dataLayer: unknown[];
	}
}

export const pageview = (url: string) => {
	if (typeof window === 'undefined' || typeof window.gtag === 'undefined')
		return;
	window.gtag('config', getGA4MeasurementId(), { page_path: url });
};

export const event = (action: string, params: Record<string, unknown>) => {
	if (typeof window === 'undefined' || typeof window.gtag === 'undefined')
		return;
	window.gtag('event', action, params);
};
