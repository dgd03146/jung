import { ToastContainer, ToastProvider } from '@jung/design-system/components';
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from '@tanstack/react-router';
import { lazy } from 'react';
import { SITE_CONFIG } from '../config/site';
import { THEME_KEY } from '../lib/theme';
import '../styles/global.css';

const TanStackRouterDevtools =
	process.env.NODE_ENV === 'production'
		? () => null
		: lazy(() =>
				import('@tanstack/react-router-devtools').then((res) => ({
					default: res.TanStackRouterDevtools,
				})),
			);

const FOUC_PREVENTION_SCRIPT = `
(function() {
  try {
    var theme = localStorage.getItem('${THEME_KEY}') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e) {}
})();
`;

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
			{
				name: 'description',
				content: SITE_CONFIG.description,
			},
			{ title: `${SITE_CONFIG.name} - ${SITE_CONFIG.description}` },
			{ property: 'og:site_name', content: SITE_CONFIG.name },
			{ property: 'og:locale', content: 'en_US' },
			{ property: 'og:type', content: 'website' },
			{ name: 'twitter:site', content: '@jung' },
		],
		scripts: [
			{
				children: FOUC_PREVENTION_SCRIPT,
			},
			{
				src: 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js',
				crossOrigin: 'anonymous',
				async: true,
			},
		],
		links: [
			{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
			{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
			{
				rel: 'preconnect',
				href: 'https://fonts.gstatic.com',
				crossOrigin: 'anonymous',
			},
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
			},
		],
	}),
	component: RootComponent,
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}

function RootComponent() {
	return (
		<ToastProvider>
			<Outlet />
			<ToastContainer />
			<TanStackRouterDevtools position='bottom-left' />
		</ToastProvider>
	);
}
