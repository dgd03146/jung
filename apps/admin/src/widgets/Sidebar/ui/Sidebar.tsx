import me from '@/fsd/assets/me.png';
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
			<Flex
				alignItems='center'
				columnGap='2'
				boxShadow='primary'
				borderRadius='lg'
				justifyContent={{ mobile: 'center', laptop: 'flex-start' }}
				paddingX={{ mobile: '0', laptop: '4' }}
				paddingY={{ mobile: '3', laptop: '4' }}
				height={{ laptop: '16' }}
			>
				<Box
					as='img'
					src={me}
					alt='Profile Image'
					width={{ mobile: '6', laptop: '8' }}
					height='auto'
				/>
				<Typography.Text
					level={2}
					display={{ mobile: 'none', laptop: 'block' }}
				>
					geojung.
				</Typography.Text>
			</Flex>
			<Flex display='flex' flexDirection='column' rowGap='0.5' marginTop='1'>
				{Routes.map(({ path, icon, label }) => (
					<Link
						key={label}
						to={path}
						className={styles.link({ selected: currentPage === path })}
					>
						{icon}
						<Typography.Text
							level={3}
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
