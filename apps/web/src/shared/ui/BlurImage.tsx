'use client';

import clsx from 'clsx';
import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import * as styles from './BlurImage.css';

/**
 * Default blur placeholder (10x10 gray gradient)
 * @see https://nextjs.org/docs/app/api-reference/components/image#blurdataurl
 */
const DEFAULT_BLUR_DATA_URL =
	'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LC0yMi4xODY6PTw2OjM5RUVFRkZGRkZGRkZGRkZGRkZGRkb/2wBDARUXFx4aHR4eHUYyLjJGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkb/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIRAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAECABEhMf/aAAwDAQACEQMRAD8AoeLa7cW2vWk1xcSSSrLsVnclgoIBAPwZq9SlVkhs4I2kdgo/9NK9M6Soy4n/2Q==';

const BlurImage = ({ fill, className, quality = 75, ...props }: ImageProps) => {
	const [isImageLoading, setImageLoading] = useState(true);

	return (
		<Image
			{...props}
			fill={fill}
			quality={quality}
			placeholder='blur'
			blurDataURL={DEFAULT_BLUR_DATA_URL}
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
