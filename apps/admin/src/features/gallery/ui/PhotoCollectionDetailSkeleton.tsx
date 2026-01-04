import { Box, Flex } from '@jung/design-system/components';

export const PhotoCollectionDetailSkeleton = () => {
	return (
		<Box padding='6'>
			<Box
				padding='6'
				borderRadius='lg'
				borderWidth='hairline'
				borderStyle='solid'
				borderColor='gray'
			>
				<Flex display='flex' justifyContent='space-between' alignItems='center'>
					<Box width='48' height='8' background='gray' borderRadius='md' />
					<Flex display='flex' columnGap='4'>
						<Box width='32' height='10' background='gray' borderRadius='md' />
						<Box width='32' height='10' background='gray' borderRadius='md' />
					</Flex>
				</Flex>
			</Box>

			<Flex wrap='wrap' gap='4' marginTop='6'>
				{Array.from({ length: 12 }).map((_, index) => (
					<Box
						key={index}
						width='full'
						height='48'
						background='gray'
						borderRadius='lg'
					/>
				))}
			</Flex>
		</Box>
	);
};
