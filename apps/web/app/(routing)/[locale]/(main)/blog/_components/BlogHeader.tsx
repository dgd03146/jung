'use client';

import { Flex } from '@jung/design-system/components';
import { SelectViewMode, useViewMode } from '@/fsd/features/blog';
import { Link } from '@/i18n/routing';
import * as styles from './BlogHeader.css';

export const BlogHeader = () => {
	const { viewMode, setViewMode } = useViewMode();
	return (
		<Flex justify='space-between' align='center' marginBottom='8'>
			<Link href='/blog' className={styles.titleLink}>
				<span className={styles.titleText}>BLOG</span>
			</Link>
			<SelectViewMode selected={viewMode} onSelect={setViewMode} />
		</Flex>
	);
};
