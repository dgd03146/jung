import * as styles from './CreateMessageFormSkeleton.css';

export const CreateMessageFormSkeleton = () => {
	return (
		<div className={styles.formSkeleton}>
			<div className={styles.emojiRow}>
				{Array.from({ length: 9 }, (_, i) => (
					<div key={i} className={styles.emojiItem} />
				))}
			</div>

			<div className={styles.colorRow}>
				{Array.from({ length: 7 }, (_, i) => (
					<div key={i} className={styles.colorItem} />
				))}
			</div>

			<div className={styles.textareaBlock} />

			<div className={styles.buttonBlock} />
		</div>
	);
};
