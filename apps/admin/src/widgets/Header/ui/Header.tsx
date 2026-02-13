import { Box, Button, Flex, Typography } from '@jung/design-system/components';
import { useCallback, useEffect, useState } from 'react';
import {
	HiChevronDoubleLeft,
	HiChevronRight,
	HiLogout,
	HiMenuAlt2,
} from 'react-icons/hi';
import { useAuth } from '@/fsd/features/auth/api/useAuth';
import { usePathname, useSidebarStore } from '@/fsd/shared';

import * as styles from './Header.css.ts';

const SCROLL_THRESHOLD = 50;

const formatPageTitle = (path: string) => {
	const segments = path.split('/').filter(Boolean);

	if (segments.length === 0) {
		return <Typography.Text fontWeight='semibold'>Dashboard</Typography.Text>;
	}

	const mainSection =
		segments[0].charAt(0).toUpperCase() + segments[0].slice(1).toLowerCase();

	const defaultSubSections: Record<string, string> = {
		blog: 'Posts',
		gallery: 'Collections',
		spots: 'Spots',
		dashboard: 'Overview',
		guestbook: 'Messages',
	};

	if (segments.includes('collections')) {
		return (
			<Flex align='center' gap='1'>
				<Typography.Text fontWeight='semibold'>Gallery</Typography.Text>
				<HiChevronRight size={14} color='rgba(0, 0, 0, 0.4)' />
				<Typography.Text level={4} color='gray300'>
					Collections
				</Typography.Text>
			</Flex>
		);
	}

	if (segments.length > 1) {
		const subSection = segments[segments.length - 1]
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(' ');
		return (
			<Flex align='center' gap='1'>
				<Typography.Text fontWeight='semibold'>{mainSection}</Typography.Text>
				<HiChevronRight size={14} color='rgba(0, 0, 0, 0.4)' />
				<Typography.Text level={4} color='gray300'>
					{subSection}
				</Typography.Text>
			</Flex>
		);
	}

	return (
		<Flex align='center' gap='1'>
			<Typography.Text fontWeight='semibold'>{mainSection}</Typography.Text>
			<HiChevronRight size={14} color='rgba(0, 0, 0, 0.4)' />
			<Typography.Text level={4} color='gray300'>
				{defaultSubSections[mainSection.toLowerCase()] || 'Overview'}
			</Typography.Text>
		</Flex>
	);
};

const Header = () => {
	const { pathname } = usePathname();
	const pageTitle = formatPageTitle(pathname);
	const [isScrolled, setIsScrolled] = useState(false);
	const { isOpen, actions } = useSidebarStore();
	const { logout } = useAuth();

	const handleScroll = useCallback(() => {
		if (!isScrolled && window.scrollY > SCROLL_THRESHOLD) {
			setIsScrolled(true);
		} else if (isScrolled && window.scrollY <= SCROLL_THRESHOLD) {
			setIsScrolled(false);
		}
	}, [isScrolled]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	return (
		<Box
			as='header'
			position='sticky'
			paddingX={{ mobile: '4', laptop: '8' }}
			display='flex'
			width='full'
			justifyContent='space-between'
			alignItems='center'
			height='16'
			className={styles.header({ isScrolled })}
			zIndex='10'
		>
			<Flex alignItems='center' gap='2'>
				<Button
					variant='ghost'
					onClick={actions.toggle}
					aria-label='Toggle sidebar'
				>
					{isOpen ? (
						<HiChevronDoubleLeft size={16} />
					) : (
						<HiMenuAlt2 size={18} />
					)}
				</Button>
				{pageTitle}
			</Flex>

			<Button
				variant='ghost'
				size='sm'
				onClick={() => logout()}
				prefix={<HiLogout size={14} />}
			>
				Logout
			</Button>
		</Box>
	);
};
export default Header;
