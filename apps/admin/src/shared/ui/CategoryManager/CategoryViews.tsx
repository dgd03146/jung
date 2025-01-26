import {
	Box,
	Button,
	Flex,
	Grid,
	Stack,
	Typography,
} from '@jung/design-system/components';
import type { CategoryWithCount } from '@jung/shared/types';
import { motion } from 'framer-motion';
import { Draggable } from 'react-beautiful-dnd';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import { CategoryCard } from './CategoryCard';
import * as styles from './CategoryView.css';

interface CategoryViewProps {
	categories: CategoryWithCount[];
	onEdit: (id: string) => void;
	type: 'blog' | 'spots';
}

export const CategoryListView = ({
	categories,
	onEdit,
	type,
}: CategoryViewProps) => {
	const getItemLabel = () => (type === 'blog' ? 'posts' : 'spots');

	return (
		<Stack gap='3' padding='6'>
			{categories.map((category, index) => (
				<Draggable key={category.id} draggableId={category.id} index={index}>
					{(provided) => (
						<motion.div
							ref={provided.innerRef}
							{...provided.draggableProps}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 20 }}
							className={styles.listViewItem}
						>
							<Flex flex='1' align='center' gap='4'>
								<Box
									className={styles.dragHandleStyle}
									{...provided.dragHandleProps}
								>
									⋮
								</Box>
								<Box
									className={styles.categoryBadge}
									style={{
										background: `${category.color}15`,
										color: category.color,
									}}
								>
									{category.name}
								</Box>
								<Box className={styles.listViewMeta}>
									<Typography.SubText
										level={1}
										color='black100'
										fontWeight='medium'
									>
										{category.count} {getItemLabel()}
									</Typography.SubText>
									<Flex gap='1'>
										<Button
											className={styles.actionButtonStyle}
											onClick={() => onEdit(category.id)}
										>
											<HiPencil />
										</Button>
										<Button className={styles.actionButtonStyle}>
											<HiTrash />
										</Button>
									</Flex>
								</Box>
							</Flex>
						</motion.div>
					)}
				</Draggable>
			))}
		</Stack>
	);
};

interface CategoryGridViewProps {
	mainCategories: CategoryWithCount[];
	subCategories: CategoryWithCount[];
	onEdit: (id: string) => void;
	type: 'blog' | 'spots';
}

export const CategoryGridView = ({
	mainCategories,
	subCategories,
	onEdit,
	type,
}: CategoryGridViewProps) => {
	return (
		<Grid className={styles.gridView}>
			{mainCategories.map((category, index) => (
				<Draggable key={category.id} draggableId={category.id} index={index}>
					{(provided) => (
						<div ref={provided.innerRef} {...provided.draggableProps}>
							<CategoryCard
								category={category}
								level={0}
								dragHandleProps={provided.dragHandleProps || undefined}
								subCategories={subCategories}
								setEditingId={onEdit}
								type={type}
							/>
						</div>
					)}
				</Draggable>
			))}
		</Grid>
	);
};
