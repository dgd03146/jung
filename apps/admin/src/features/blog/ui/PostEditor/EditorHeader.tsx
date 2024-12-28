import { Routes } from '@/fsd/shared';
import { Flex } from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import { HiArrowLeft, HiSave, HiX } from 'react-icons/hi';
import { HiPaperAirplane } from 'react-icons/hi2';
import * as styles from './EditorHeader.css';

type Props = {
	onSave: () => void;
	onDiscard: () => void;
	onSubmit: () => void;
	isSubmitting: boolean;
	isEditMode: boolean;
};

const EditorHeader = ({
	onSave,
	onDiscard,
	onSubmit,
	isSubmitting,
	isEditMode,
}: Props) => {
	return (
		<div className={styles.header}>
			<Flex justifyContent='space-between' alignItems='center'>
				<Link to={Routes.blog.path}>
					<button className={styles.backButton}>
						<HiArrowLeft className={styles.buttonIcon} />
						<span className={styles.buttonText}>Posts</span>
					</button>
				</Link>
				<div className={styles.buttonGroup}>
					<button className={styles.actionButton} onClick={onSave}>
						<HiSave className={styles.buttonIcon} />
						<span className={styles.buttonText}>Draft</span>
					</button>
					<button className={styles.actionButton} onClick={onDiscard}>
						<HiX className={styles.buttonIcon} />
						<span className={styles.buttonText}>Discard</span>
					</button>
					<button
						className={styles.submitButton}
						onClick={onSubmit}
						disabled={isSubmitting}
					>
						<HiPaperAirplane
							className={styles.buttonIcon}
							style={{ transform: 'rotate(90deg)' }}
						/>
						<span className={styles.buttonText}>
							{isSubmitting
								? isEditMode
									? 'Updating...'
									: 'Publishing...'
								: isEditMode
								  ? 'Update'
								  : 'Publish'}
						</span>
					</button>
				</div>
			</Flex>
		</div>
	);
};

export default EditorHeader;
