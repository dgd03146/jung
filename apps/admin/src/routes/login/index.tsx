import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '@/fsd/views/login';

export const Route = createFileRoute('/login/')({
	component: LoginPage,
});
