import { Box, Flex } from '@jung/design-system/components';
import * as pageStyles from './PhotoDetailPage.css';
import * as skeletonStyles from './PhotoDetailSkeleton.css';

interface PhotoDetailSkeletonProps {
	isModal?: boolean;
}

export const PhotoDetailSkeleton = ({
	isModal = true,
}: PhotoDetailSkeletonProps) => {
	return (
		<Flex className={pageStyles.container({ isModal })}>
			<Box
				className={`${pageStyles.imageWrapper({ isModal })} ${
					skeletonStyles.skeletonImage
				}`}
			/>

			<Flex
				direction='column'
				className={pageStyles.content({ isModal })}
				gap='5'
				paddingX='5'
				paddingY='5'
			>
				<Box className={skeletonStyles.skeletonTitle} />
				<Box className={skeletonStyles.skeletonTextLineFull} />
				<Box className={skeletonStyles.skeletonTextLineMedium} />
				<Box className={skeletonStyles.skeletonTextLineShort} />
				<Flex gap='2'>
					<Box className={skeletonStyles.skeletonTagShort} />
					<Box className={skeletonStyles.skeletonTagMedium} />
				</Flex>

				<Flex
					className={pageStyles.likesContainer}
					paddingTop='4'
					justifyContent='space-between'
					alignItems='center'
				>
					<Box className={skeletonStyles.skeletonLikesCount} />
					<Flex gap='4'>
						<Box className={skeletonStyles.skeletonActionButton} />
						<Box className={skeletonStyles.skeletonActionButton} />
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
