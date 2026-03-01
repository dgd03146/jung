import { GUESTBOOK_COLORS, GUESTBOOK_EMOJIS } from '@/fsd/entities/guestbook';
import * as styles from './CreateMessageFormSkeleton.css';

export const CreateMessageFormSkeleton = () => {
	return (
		<div className={styles.formSkeleton}>
			<div className={styles.pickerRow}>
				{Array.from({ length: GUESTBOOK_EMOJIS.length }, (_, i) => (
					<div key={i} className={styles.emojiItem} />
				))}
			</div>

			<div className={styles.pickerRow}>
				{Array.from({ length: GUESTBOOK_COLORS.length }, (_, i) => (
					<div key={i} className={styles.colorItem} />
				))}
			</div>

			<div className={styles.textareaBlock} />

			<div className={styles.buttonBlock} />
		</div>
	);
};
