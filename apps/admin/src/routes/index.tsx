// /src/routes/index.tsx

import { Dashboard } from '@/fsd/views';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: Dashboard,
});
