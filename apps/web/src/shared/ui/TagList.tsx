import { Flex, Tag, Typography } from '@jung/design-system/components';
import type { ComponentProps } from 'react';

type FlexProps = ComponentProps<typeof Flex>;

interface TagListProps {
	tags?: string[];
	gap?: FlexProps['gap'];
	wrap?: FlexProps['wrap'];
	className?: string;
	showHash?: boolean;
	flex?: FlexProps['flex'];
	minWidth?: FlexProps['minWidth'];
	borderColor?: FlexProps['borderColor'];
	borderStyle?: FlexProps['borderStyle'];
	paddingBottom?: FlexProps['paddingBottom'];
}

export const TagList = ({
	tags,
	gap = '2',
	wrap = 'wrap',
	className,
	showHash = true,
	flex,
	minWidth,
	borderColor,
	borderStyle,
	paddingBottom,
}: TagListProps) => {
	if (!tags?.length) return null;

	return (
		<Flex
			gap={gap}
			wrap={wrap}
			className={className}
			flex={flex}
			minWidth={minWidth}
			borderColor={borderColor}
			borderStyle={borderStyle}
			paddingBottom={paddingBottom}
		>
			{tags.map((tag) => (
				<Tag key={tag} variant='secondary'>
					<Typography.FootNote level={1}>
						{showHash && '# '}
						{tag}
					</Typography.FootNote>
				</Tag>
			))}
		</Flex>
	);
};
