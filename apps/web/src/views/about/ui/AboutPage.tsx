import { useTranslations } from 'next-intl';
import * as styles from './AboutPage.css';

const PARAGRAPHS = [
	'p1',
	'p2',
	'p3',
	'p4',
	'p5',
	'p6',
	'p7',
	'p8',
	'p9',
	'p10',
	'p11',
] as const;

const AboutPage = () => {
	const t = useTranslations('about');

	return (
		<article className={styles.container}>
			<div className={styles.content}>
				{PARAGRAPHS.map((key) => (
					<p key={key} className={styles.paragraph}>
						{t(key)}
					</p>
				))}
			</div>
		</article>
	);
};

export default AboutPage;
