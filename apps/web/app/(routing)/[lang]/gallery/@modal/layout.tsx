import { Typography } from '@jung/design-system/components';

interface ModalLayoutProps {
	children: React.ReactNode;
}

export default function ModalLayout({ children }: ModalLayoutProps) {
	return (
		<>
			<Typography.Heading level={4} color='primary' marginY='6'>
				Gallery.
			</Typography.Heading>
			{children}
		</>
	);
}
