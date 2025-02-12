'use client';

import clsx from 'clsx';
import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import * as styles from './BlurImage.css';

const BlurImage = ({ fill, className, ...props }: ImageProps) => {
	const [isImageLoading, setImageLoading] = useState(true);

	return (
		<Image
			{...props}
			fill={fill}
			onLoad={() => setImageLoading(false)}
			className={clsx(
				isImageLoading ? styles.blurredImage : styles.loadedImage,
				fill && styles.fillImage,
				className,
			)}
		/>
	);
};

export default BlurImage;
