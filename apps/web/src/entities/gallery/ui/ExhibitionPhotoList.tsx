import type { ReactNode } from 'react';

interface ExhibitionPhotoListProps {
	children: ReactNode;
}

export const ExhibitionPhotoList = ({ children }: ExhibitionPhotoListProps) => {
	return <div>{children}</div>;
};
