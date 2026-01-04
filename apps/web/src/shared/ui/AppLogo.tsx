import BlurImage from './BlurImage';

export const AppLogo = ({
	alt = "Jung's logo",
	width = 150,
	height = 150,
}: {
	alt?: string;
	width?: number;
	height?: number;
}) => {
	return (
		<BlurImage
			src='/images/logo.png'
			alt={alt}
			width={width}
			height={height}
			priority
		/>
	);
};
