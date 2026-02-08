'use client';

import { Flex, Typography } from '@jung/design-system/components';
import type { HeadingItem } from '@/fsd/shared';
import { useActiveHeading } from '../model/useActiveHeading';
import * as styles from './TableOfContents.css';

type Props = {
	headings: HeadingItem[];
};

export const TableOfContents = ({ headings }: Props) => {
	const activeId = useActiveHeading(headings.map((h) => h.id));

	if (headings.length === 0) return null;

	const handleClick = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	return (
		<Flex
			direction='column'
			gap='1'
			className={styles.container}
			display={{ base: 'none', laptop: 'flex' }}
		>
			<Typography.Text
				level={1}
				color='primary'
				fontWeight='semibold'
				className={styles.header}
			>
				On This Page
			</Typography.Text>
			<nav>
				{headings.map((heading) => (
					<button
						key={heading.id}
						type='button'
						onClick={() => handleClick(heading.id)}
						className={styles.tocItem({
							level: heading.level,
							active: activeId === heading.id,
						})}
					>
						{heading.text}
					</button>
				))}
			</nav>
		</Flex>
	);
};
