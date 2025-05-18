import logo from '/public/images/logo.png';
import BlurImage from './BlurImage';

export const AppLogo = ({
	alt = "Jung's logo",
	width = 150,
	height = 150,
}: { alt?: string; width?: number; height?: number }) => {
	return (
		<BlurImage src={logo} alt={alt} width={width} height={height} priority />
	);
};
