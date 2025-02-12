import { Button, List, ListItem } from '@jung/design-system';

const ListExample = [
	{ id: '1', firstName: 'John', lastName: 'Doe' },
	{ id: '2', firstName: 'Jane', lastName: 'Doe' },
	{ id: '3', firstName: 'Gildong', lastName: 'Hong' },
];

const Item = ({ item }: { item: (typeof ListExample)[0] }) => {
	return (
		<ListItem
			columnGap='8'
			suffix={<Button variant='primary'>Primary Button</Button>}
		>
			<div>{item.firstName}</div>
			<div>{item.lastName}</div>
		</ListItem>
	);
};

const PopularList = () => {
	return (
		<List
			items={ListExample}
			renderItem={(item) => <Item key={item.id} item={item} />}
		/>
	);
};

export default PopularList;
