import { Layout } from '@/fsd/widgets';

interface Props {
	children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
	return <Layout>{children}</Layout>;
}
