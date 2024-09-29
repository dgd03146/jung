import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import * as styles from './BlurImage.css';

const BlurImage = (props: ImageProps) => {
	const [isImageLoading, setImageLoading] = useState(true);

	return (
		<Image
			{...props}
			onLoadingComplete={() => setImageLoading(false)}
			className={isImageLoading ? styles.blurredImage : styles.loadedImage}
		/>
	);
};

export default BlurImage;
