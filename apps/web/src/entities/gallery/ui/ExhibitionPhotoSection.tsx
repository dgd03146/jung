import type { Photo } from '@jung/shared/types';
import { BlurImage, formatDate, ROUTES } from '@/fsd/shared';
import { Link } from '@/i18n/routing';
import * as styles from './ExhibitionPhotoSection.css';

const PRIORITY_IMAGE_COUNT = 2;

interface ExhibitionPhotoSectionProps {
	photo: Photo;
	index: number;
	totalCount: number;
}

export const ExhibitionPhotoSection = ({
	photo,
	index,
	totalCount,
}: ExhibitionPhotoSectionProps) => {
	const isReverse = index % 2 === 1;
	const number = String(index + 1).padStart(3, '0');
	const total = String(totalCount).padStart(3, '0');

	return (
		<section className={styles.section({ reverse: isReverse })}>
			<div className={styles.imageHalf}>
				<BlurImage
					fill
					src={photo.image_url}
					alt={photo.alt || photo.title || 'Gallery photo'}
					sizes='(max-width: 767px) 100vw, 50vw'
					className={styles.image}
					priority={index < PRIORITY_IMAGE_COUNT}
				/>
			</div>
			<div className={styles.contentHalf}>
				<span className={styles.numbering}>
					{number} / {total}
				</span>
				{photo.title && <h2 className={styles.title}>{photo.title}</h2>}
				{photo.description && (
					<p className={styles.description}>{photo.description}</p>
				)}
				{photo.created_at && (
					<span className={styles.date}>{formatDate(photo.created_at)}</span>
				)}
				{photo.tags && photo.tags.length > 0 && (
					<div className={styles.tagsWrapper}>
						{photo.tags.map((t) => (
							<span key={t} className={styles.tag}>
								{t}
							</span>
						))}
					</div>
				)}
				<Link
					href={ROUTES.PHOTO.pathById(photo.id)}
					className={styles.viewLink}
				>
					VIEW →
				</Link>
			</div>
		</section>
	);
};
