'use client';

import { usePathname, useRouter } from 'next/navigation';
import { defaultLocale, locales } from '../config';

const LanguageSwitcher = () => {
	const { push } = useRouter();
	const pathname = usePathname()!;

	const currentLocale = pathname.split('/')[1];

	const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newLocale = event.target.value;
		const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
		push(newPathname);
	};

	return (
		<select
			value={currentLocale || defaultLocale}
			onChange={handleLocaleChange}
			className='border px-4 py-2 rounded-md shadow-md bg-white text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none'
		>
			{locales.map(({ code, name }) => (
				<option key={code} value={code}>
					{name}
				</option>
			))}
		</select>
	);
};

export default LanguageSwitcher;
