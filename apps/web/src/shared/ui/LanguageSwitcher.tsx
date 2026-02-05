'use client';

import { useLocale } from 'next-intl';
import { routing, usePathname, useRouter } from '@/i18n/routing';
import * as styles from './LanguageSwitcher.css';

type Props = {
	variant?: 'light' | 'dark';
};

const LanguageSwitcher = ({ variant = 'light' }: Props) => {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();

	const handleLocaleChange = (newLocale: string) => {
		router.replace(pathname, { locale: newLocale });
	};

	return (
		<div className={styles.container({ variant })}>
			{routing.locales.map((loc, index) => (
				<>
					{index > 0 && (
						<span
							key={`divider-${loc}`}
							className={styles.divider({ variant })}
						>
							/
						</span>
					)}
					<button
						key={loc}
						type='button'
						onClick={() => handleLocaleChange(loc)}
						className={styles.button({ variant, isActive: locale === loc })}
						aria-label={`Switch to ${loc === 'ko' ? 'Korean' : 'English'}`}
						aria-current={locale === loc ? 'true' : undefined}
					>
						{loc.toUpperCase()}
					</button>
				</>
			))}
		</div>
	);
};

export default LanguageSwitcher;
