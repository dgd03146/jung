// FIXME: icons들 다 나중에 shared로 빼야할 듯?
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
		return (
			<Flex align='center' gap='2'>
				<Typography.Text color='primary' fontWeight='medium'>
					Dashboard
				</Typography.Text>
			</Flex>
		);
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
			<Flex align='center' gap='2'>
				<Typography.Heading level={5} color='primary' fontWeight='semibold'>
					Gallery
				</Typography.Heading>
				<HiChevronRight color='blue' />
				<Typography.Text level={4} color='primary' fontWeight='medium'>
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
			<Flex align='center' gap='2'>
				<Typography.Text color='primary' fontWeight='semibold'>
					{mainSection}
				</Typography.Text>
				<HiChevronRight color='blue' />
				<Typography.Text level={4} color='primary' fontWeight='medium'>
					{subSection}
				</Typography.Text>
			</Flex>
		);
	}

	return (
		<Flex align='center' gap='2'>
			<Typography.Text color='primary' fontWeight='semibold'>
				{mainSection}
			</Typography.Text>
			<HiChevronRight color='blue' />
			<Typography.Text level={4} color='primary' fontWeight='medium'>
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
			<Flex alignItems='center' gap='1'>
				<Button
					variant='ghost'
					onClick={actions.toggle}
					aria-label='Toggle sidebar'
				>
					{isOpen ? (
						<HiChevronDoubleLeft size={18} />
					) : (
						<HiMenuAlt2 size={20} />
					)}
				</Button>
				<Typography.Heading level={4} color='primary'>
					{pageTitle}
				</Typography.Heading>
			</Flex>

			<Button
				variant='primary'
				size='md'
				borderRadius='lg'
				onClick={() => logout()}
				prefix={<HiLogout />}
				fontWeight='medium'
			>
				Logout
			</Button>
		</Box>
	);
};
export default Header;
