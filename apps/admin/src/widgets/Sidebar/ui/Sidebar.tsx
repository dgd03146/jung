import { usePathname } from '@/fsd/shared';
import { Routes } from '@/fsd/shared';
import { Box, Flex, Typography } from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import * as styles from './Sidebar.css';

const Sidebar = () => {
	const { pathname: currentPage } = usePathname();

	// TODO: pathname에 따라 style주기
	return (
		<Box
			as='section'
			width={{ mobile: 'auto', laptop: '72' }}
			paddingX={{ laptop: '4' }}
			paddingY='10'
		>
			<Flex display='flex' flexDirection='column'>
				{Routes.map(({ path, icon, label }) => (
					<Link
						key={label}
						to={path}
						className={styles.link({ selected: currentPage === path })}
					>
						{icon}
						<Typography.Text
							level={2}
							display={{ mobile: 'none', laptop: 'block' }}
						>
							{label}
						</Typography.Text>
					</Link>
				))}
			</Flex>
		</Box>
	);
};

export default Sidebar;
