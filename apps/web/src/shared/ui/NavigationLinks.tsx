'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';

const NavigationLinks = () => {
	const locale = useLocale();

	return (
		<nav className='flex justify-center items-center mt-5 space-x-4'>
			<LanguageSwitcher />
			<Link
				href='/home'
				locale={locale}
				className='border px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md shadow-md transform transition-transform duration-200 hover:scale-105'
			>
				Home
			</Link>
			<Link
				href='/about'
				locale={locale}
				className='border px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-md shadow-md transform transition-transform duration-200 hover:scale-105'
			>
				About
			</Link>
		</nav>
	);
};

export default NavigationLinks;
