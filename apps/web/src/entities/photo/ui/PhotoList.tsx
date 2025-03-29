import type { AlbumPhoto } from '@jung/shared/types';
import { MasonryPhotoAlbum, type Render } from 'react-photo-album';
import 'react-photo-album/masonry.css';
import { ALBUM_OPTIONS } from '../config/photo';

interface PhotoListProps {
	photos: AlbumPhoto[];
	renderPhoto: Render<AlbumPhoto>;
}

export const PhotoList = ({ photos, renderPhoto }: PhotoListProps) => {
	return (
		<MasonryPhotoAlbum
			photos={photos}
			spacing={ALBUM_OPTIONS.SPACING}
			columns={(containerWidth) => {
				if (containerWidth < ALBUM_OPTIONS.BREAKPOINTS.MOBILE)
					return ALBUM_OPTIONS.COLUMNS.MOBILE;
				if (containerWidth < ALBUM_OPTIONS.BREAKPOINTS.LAPTOP)
					return ALBUM_OPTIONS.COLUMNS.LAPTOP;
				return ALBUM_OPTIONS.COLUMNS.DESKTOP;
			}}
			render={renderPhoto}
		/>
	);
};
