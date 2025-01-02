import { Box } from '@jung/design-system/components';

interface ImageCellProps {
	url: string;
	alt: string;
}

export const ImageCell = ({ url, alt }: ImageCellProps) => (
	<Box
		as='img'
		src={url}
		alt={alt}
		width='20'
		height='20'
		objectFit='cover'
		borderRadius='md'
		boxShadow='primary'
	/>
);
