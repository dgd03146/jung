import { useDeleteCategory } from '@/fsd/shared/api/useDeleteCategory';
import { Box, Button, Flex, Typography } from '@jung/design-system/components';
import type { CategoryCount } from '@jung/shared/types';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import type { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { HiPencil, HiTrash } from 'react-icons/hi';
import * as styles from './CategoryCard.css';

interface CategoryCardProps {
	category: CategoryCount;
	level?: number;
	dragHandleProps?: DraggableProvidedDragHandleProps;
	subCategories: CategoryCount[];
	setEditingId: (id: string) => void;
	type: 'blog' | 'spots';
}

export const CategoryCard = ({
	category,
	level = 0,
	dragHandleProps,
	subCategories,
	setEditingId,
	type,
}: CategoryCardProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const deleteCategory = useDeleteCategory(type);
	const hasChildren = category.subCategoriesCount > 0;

	const handleDelete = () => {
		if (hasChildren) {
			alert(
				`Please delete all sub${type === 'blog' ? 'posts' : 'spots'} first`,
			);
			return;
		}

		if (
			window.confirm(`Are you sure you want to delete this ${type} category?`)
		) {
			deleteCategory.mutate(category.id);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			className={styles.categoryCard}
			style={assignInlineVars({
				[styles.levelIndent]: level ? `${level * 20}px` : null,
				[styles.borderColor]: category.color || null,
			})}
		>
			<Flex paddingY='4' paddingX='2' justify='space-between' align='center'>
				<Box className={styles.dragHandle} {...dragHandleProps}>
					⋮
				</Box>
				{hasChildren && (
					<Button
						onClick={() => setIsExpanded(!isExpanded)}
						className={styles.expandButton}
					>
						{isExpanded ? '▼' : '▶'}
					</Button>
				)}
				<Typography.SubText
					level={1}
					color='black100'
					fontWeight='medium'
					flex={1}
				>
					{category.name}
					{category.parent_id ? (
						<span className={styles.parentBadge}>Sub</span>
					) : (
						category.subCategoriesCount > 0 && (
							<span className={styles.parentBadge}>
								{subCategories.length} Sub
							</span>
						)
					)}
				</Typography.SubText>
				<Flex gap='1'>
					<Button
						className={styles.actionButton}
						size='sm'
						onClick={() => setEditingId(category.id)}
					>
						<HiPencil />
					</Button>
					<Button
						className={styles.actionButton}
						size='sm'
						onClick={handleDelete}
						disabled={deleteCategory.isPending}
					>
						<HiTrash />
					</Button>
				</Flex>
			</Flex>

			{category.description && (
				<Box padding='4'>
					<Typography.SubText color='black100'>
						{category.description}
					</Typography.SubText>
				</Box>
			)}

			<Flex
				align='center'
				justify='space-between'
				paddingY='3'
				paddingX='4'
				background='white100'
			>
				<span className={styles.postCount}>
					{category.count} {type === 'blog' ? 'posts' : 'spots'}
				</span>
			</Flex>

			{isExpanded && (
				<AnimatePresence>
					{subCategories
						.filter((child) => child.parent_id === category.id)
						.map((childCategory) => (
							<CategoryCard
								key={childCategory.id}
								category={childCategory}
								level={level + 1}
								dragHandleProps={dragHandleProps}
								subCategories={subCategories.filter(
									(sub) => sub.parent_id === childCategory.id,
								)}
								setEditingId={setEditingId}
								type={type}
							/>
						))}
				</AnimatePresence>
			)}
		</motion.div>
	);
};
