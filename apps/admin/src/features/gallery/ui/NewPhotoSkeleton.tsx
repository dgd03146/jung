import { Box, Container, Flex, Grid } from '@jung/design-system/components';

export const NewPhotoSkeleton = () => {
	return (
		<Box padding='6'>
			<Container background='white' borderRadius='xl' boxShadow='primary'>
				<Grid
					gridTemplateColumns={{
						base: '1',
						tablet: '1/2',
					}}
					gap='6'
					padding='6'
				>
					{/* 이미지 업로드 영역 */}
					<Box height='96' background='gray' borderRadius='xl' />

					{/* 상세 정보 영역 */}
					<Flex direction='column' gap='4'>
						{/* 제목 필드 */}
						<Box>
							<Box
								height='4'
								width='24'
								background='gray'
								marginBottom='2'
								borderRadius='md'
							/>
							<Box height='10' background='gray' borderRadius='md' />
						</Box>

						{/* 설명 필드 */}
						<Box>
							<Box
								height='4'
								width='24'
								background='gray'
								marginBottom='2'
								borderRadius='md'
							/>
							<Box height='32' background='gray' borderRadius='md' />
						</Box>

						{/* 카테고리 필드 */}
						<Box>
							<Box
								height='4'
								width='24'
								background='gray'
								marginBottom='2'
								borderRadius='md'
							/>
							<Box height='10' background='gray' borderRadius='md' />
						</Box>

						{/* 태그 필드 */}
						<Box>
							<Box
								height='4'
								width='24'
								background='gray100'
								marginBottom='2'
								borderRadius='md'
							/>
							<Box height='10' background='gray' borderRadius='md' />
						</Box>
					</Flex>
				</Grid>
			</Container>
		</Box>
	);
};
