import type { ReactNode } from 'react';
import * as styles from './ExhibitionPhotoList.css';

interface ExhibitionPhotoListProps {
	children: ReactNode;
}

export const ExhibitionPhotoList = ({ children }: ExhibitionPhotoListProps) => {
	return <div className={styles.container}>{children}</div>;
};
