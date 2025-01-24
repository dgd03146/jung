import {
	Box,
	Button,
	Checkbox,
	Flex,
	Stack,
	Typography,
} from '@jung/design-system/components';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useState } from 'react';
import { HiPlus, HiTrash } from 'react-icons/hi';
import { useDeletePhotosFromCollection } from '../api/useDeletePhotosFromCollection';
import { useGetPhotosByCollectionId } from '../api/useGetPhotosByCollectionId';
import { PhotoCollectionDetailSkeleton } from './PhotoCollectionDetailSkeleton';

export const PhotoCollectionDetail = () => {
	const { collectionId } = useParams({
		from: '/gallery/collections/$collectionId',
	});
	const navigate = useNavigate();

	const { photos, total, collectionTitle, isLoading } =
		useGetPhotosByCollectionId({
			collectionId,
			page: 1,
			limit: 50,
		});

	const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

	const deletePhotosMutation = useDeletePhotosFromCollection({
		collectionId,
	});

	const handlePhotoSelect = (photoId: string) => {
		setSelectedPhotos((prev) =>
			prev.includes(photoId)
				? prev.filter((id) => id !== photoId)
				: [...prev, photoId],
		);
	};

	const handleSelectAll = () => {
		setSelectedPhotos((prev) =>
			prev.length === photos.length ? [] : photos.map((photo) => photo.id),
		);
	};

	const handleAddPhotos = () => {
		navigate({
			to: '/gallery/photos/new',
			params: {
				collectionId,
			},
		});
	};

	const handleDeleteSelected = async () => {
		if (selectedPhotos.length === 0) return;

		if (window.confirm(`Delete ${selectedPhotos.length} selected photos?`)) {
			const selectedPhotoUrls = photos
				.filter((photo) => selectedPhotos.includes(photo.id))
				.map((photo) => photo.image_url);

			deletePhotosMutation.mutate(
				{
					photoIds: selectedPhotos,
					photoUrls: selectedPhotoUrls,
				},
				{
					onSuccess: () => {
						setSelectedPhotos([]);
					},
				},
			);
		}
	};

	if (isLoading) {
		return <PhotoCollectionDetailSkeleton />;
	}

	return (
		<Box padding='6'>
			<Stack space='6'>
				<Box padding='6' borderRadius='lg' boxShadow='primary'>
					<Flex
						display='flex'
						justifyContent='space-between'
						alignItems='center'
					>
						<Typography.Heading level={5} color='primary'>
							{collectionTitle} ({total})
						</Typography.Heading>
						<Flex display='flex' columnGap='4'>
							<Button
								variant='primary'
								size='md'
								borderRadius='md'
								prefix={<HiPlus />}
								onClick={handleAddPhotos}
							>
								New Photos
							</Button>
							{photos.length > 0 && (
								<>
									<Button
										variant='secondary'
										size='md'
										borderRadius='md'
										onClick={handleSelectAll}
									>
										{selectedPhotos.length === photos.length
											? 'Deselect All'
											: 'Select All'}
									</Button>
									{selectedPhotos.length > 0 && (
										<Button
											variant='outline'
											size='md'
											prefix={<HiTrash />}
											onClick={handleDeleteSelected}
											disabled={deletePhotosMutation.isPending}
										>
											Delete {selectedPhotos.length} Selected
										</Button>
									)}
								</>
							)}
						</Flex>
					</Flex>
				</Box>

				{photos.length === 0 ? (
					<Box
						padding='12'
						borderRadius='lg'
						borderWidth='hairline'
						borderStyle='solid'
						borderColor='gray100'
						display='flex'
						alignItems='center'
						justifyContent='center'
						flexDirection='column'
					>
						<Box fontSize='3xl'>🖼️</Box>
						<Typography.Text level={2} color='gray500'>
							No photos in this collection
						</Typography.Text>
					</Box>
				) : (
					<Flex gap='4' wrap='wrap'>
						{photos.map((photo) => (
							<Box
								key={photo.id}
								position='relative'
								borderRadius='lg'
								borderWidth='hairline'
								borderStyle='solid'
								borderColor='gray100'
								cursor='pointer'
								width='60'
								height='60'
								onClick={() => handlePhotoSelect(photo.id)}
							>
								<Box
									as='img'
									width='full'
									height='full'
									src={photo.image_url}
									alt={photo.alt || ''}
									objectFit='cover'
								/>
								<Checkbox
									opacity={selectedPhotos.includes(photo.id) ? 100 : 0}
									position='absolute'
									bottom={0}
									left={0}
									checked={selectedPhotos.includes(photo.id)}
									borderRadius='lg'
									onChange={() => handlePhotoSelect(photo.id)}
								/>
							</Box>
						))}
					</Flex>
				)}
			</Stack>
		</Box>
	);
};
