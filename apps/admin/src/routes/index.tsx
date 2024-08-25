// /src/routes/index.tsx

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: Home,
});

function Home() {
	return (
		<div>
			<h3>Welcome Home!</h3>
		</div>
	);
}
