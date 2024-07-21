import { Flex, Typography } from '@jung/design-system/components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as styles from './NavLink.css';

type NavItem = {
	id: string;
	path: string;
	label: string;
};

const NavLink = ({
	item,
	isActive,
	isMainNav = false,
}: {
	item: NavItem;
	isActive: boolean;
	isMainNav?: boolean;
}) => (
	<Link href={item.path}>
		<Typography.Heading
			level={isMainNav ? 1 : 3}
			fontSize={isMainNav ? { tablet: '6xl' } : { mobile: 'xl', tablet: '4xl' }}
			color={{
				base: isActive ? 'primary400' : 'white',
				hover: 'primary200',
			}}
		>
			{item.label}
		</Typography.Heading>
	</Link>
);

const NavLinks = ({
	items,
	isMainNav = false,
}: {
	items: NavItem[];
	isMainNav?: boolean;
}) => {
	const pathname = usePathname();
	const extractedPath = pathname.replace(/^\/[a-z]{2}\//, '');

	return (
		<Flex className={isMainNav ? styles.mainNav : styles.subNav}>
			{items.map((item) => (
				<NavLink
					key={item.id}
					item={item}
					isActive={`/${extractedPath}` === item.path}
					isMainNav={isMainNav}
				/>
			))}
		</Flex>
	);
};

export default NavLinks;
