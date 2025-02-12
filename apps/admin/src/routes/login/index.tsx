import { LoginPage } from '@/fsd/views/login';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login/')({
	component: LoginPage,
});
