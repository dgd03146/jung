import type { AlbumPhoto } from '@jung/shared/types';
import { MasonryPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/masonry.css';
import { ALBUM_OPTIONS } from '../config/constants';
import { PhotoCard } from './PhotoCard';

interface PhotoListProps {
	photos: AlbumPhoto[];
}

export const PhotoList = ({ photos }: PhotoListProps) => {
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
			render={{
				image: (props, context) => (
					<PhotoCard imageProps={props} contextProps={context} />
				),
			}}
		/>
	);
};
