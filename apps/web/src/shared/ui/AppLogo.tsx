import logo from '/public/images/logo.png';
import BlurImage from './BlurImage';

export const AppLogo = ({
	alt = "Jung's logo",
	width = 200,
	height = 200,
}: { alt?: string; width?: number; height?: number }) => {
	return (
		<BlurImage src={logo} alt={alt} width={width} height={height} priority />
	);
};
