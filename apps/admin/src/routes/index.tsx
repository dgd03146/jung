import { createFileRoute } from '@tanstack/react-router';
// /src/routes/index.tsx
import { DashboardPage } from '../views';

export const Route = createFileRoute('/')({
	component: DashboardPage,
});
