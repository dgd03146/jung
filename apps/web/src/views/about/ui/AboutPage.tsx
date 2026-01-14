import { LETTER_CONTENT } from '../config/content';
import * as styles from './AboutPage.css';

const AboutPage = () => {
	return (
		<article className={styles.container}>
			<div className={styles.content}>
				{LETTER_CONTENT.split('\n\n').map((text, index) => (
					<p key={index} className={styles.paragraph}>
						{text}
					</p>
				))}
			</div>
		</article>
	);
};

export default AboutPage;
