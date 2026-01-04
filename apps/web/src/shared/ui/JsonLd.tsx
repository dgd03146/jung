type JsonLdProps = {
	// biome-ignore lint/suspicious/noExplicitAny: JSON-LD can have various schema types
	data: Record<string, any>;
};

/**
 * Safely stringify JSON-LD data with XSS protection.
 * Escapes HTML-sensitive characters to prevent script injection.
 * @see https://nextjs.org/docs/app/guides/json-ld
 */
const safeJsonLdStringify = (data: Record<string, unknown>): string => {
	return JSON.stringify(data)
		.replace(/</g, '\\u003c')
		.replace(/>/g, '\\u003e')
		.replace(/&/g, '\\u0026');
};

export const JsonLd = ({ data }: JsonLdProps) => {
	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(data) }}
		/>
	);
};
