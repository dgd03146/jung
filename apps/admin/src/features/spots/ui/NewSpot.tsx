import { useGetCategories } from '@/fsd/shared';
import {
	Box,
	Button,
	Container,
	Flex,
	Input,
	Stack,
	Textarea,
	Typography,
	useToast,
} from '@jung/design-system/components';
import type { SpotImageUpload } from '@jung/shared/types';
import { useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { HiLocationMarker, HiTag } from 'react-icons/hi';
import { MdAdd, MdDelete } from 'react-icons/md';
import { useCreateSpot } from '../api/useCreateSpot';
import { useGetSpotById } from '../api/useGetSpotById';
import { useUpdateSpot } from '../api/useUpdateSpot';
import * as styles from './NewSpot.css';
import { ImageUploader } from './SpotTable/ImageUploader';

interface SpotFormData {
	title: string;
	description: string;
	address: string;
	files: File[];
	category_id: string;
	coordinates: { lat: number; lng: number };
	tags: string[];
	tips: string[];
}

const INITIAL_FORM_DATA: SpotFormData = {
	title: '',
	description: '',
	address: '',
	files: [],
	category_id: '',
	coordinates: { lat: 0, lng: 0 },
	tags: [''],
	tips: [''],
};

export const NewSpot = () => {
	const showToast = useToast();
	const createSpotMutation = useCreateSpot();
	const updateSpotMutation = useUpdateSpot();
	const params = useParams({ strict: false });
	const isEditMode = !!params?.spotId;

	const { data: spot, isLoading } = useGetSpotById(params.spotId!);
	const { data: categories } = useGetCategories('spots');

	const [formData, setFormData] = useState<SpotFormData>(INITIAL_FORM_DATA);
	const [images, setImages] = useState<SpotImageUpload[]>([]);

	useEffect(() => {
		if (isEditMode && spot) {
			setFormData({
				title: spot.title,
				description: spot.description,
				address: spot.address,
				files: [],
				category_id: spot.category_id || '',
				coordinates: spot.coordinates,
				tags: spot.tags || [''],
				tips: spot.tips || [''],
			});
			const existingImages: SpotImageUpload[] = spot.photos.map((photo) => ({
				id: photo.id,
				url: photo.url,
				status: 'existing',
			}));
			setImages(existingImages);
		}
	}, [isEditMode, spot]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (
			!formData.title ||
			!formData.description ||
			!formData.address ||
			!formData.category_id
		) {
			showToast('필수 항목을 모두 입력해주세요.', 'error');
			return;
		}

		const spotData = {
			title: formData.title.trim(),
			description: formData.description.trim(),
			address: formData.address.trim(),
			category_id: formData.category_id,
			coordinates: formData.coordinates,
			tags: formData.tags.filter((tag) => tag.trim() !== ''),
			tips: formData.tips.filter((tip) => tip.trim() !== ''),
		};

		if (isEditMode) {
			updateSpotMutation.mutate({
				id: params.spotId!,
				...spotData,
				images: images.map((image) => ({
					id: image.id,
					url: image.url,
					status: image.status,
					file: image.file,
				})),
			});
		} else {
			createSpotMutation.mutate({
				...spotData,
				files: images.filter((img) => img.file).map((img) => img.file!),
			});
		}
	};

	if (isEditMode && isLoading) {
		return <div>Loading...</div>;
	}

	// TODO: Form Validation 체크 로직 추가

	return (
		<Container background='white'>
			<Box
				as='form'
				background='white'
				borderRadius='lg'
				padding='6'
				boxShadow='primary'
				onSubmit={handleSubmit}
			>
				<Flex
					gap={{ base: '6', laptop: '10' }}
					flexDirection={{ base: 'column', tablet: 'row' }}
				>
					{/* Basic Information */}
					<Stack flexBasis='2/5'>
						<Flex align='center' gap='2' color='primary' marginBottom='4'>
							<HiLocationMarker size={20} />
							<Typography.Text level={1} fontWeight='semibold'>
								Basic Information
							</Typography.Text>
						</Flex>

						<Stack
							space='4'
							background='white'
							borderRadius='lg'
							padding='6'
							boxShadow='primary'
						>
							<Stack space='2'>
								<Typography.Text level={2} fontWeight='medium'>
									Title
									{!formData.title && (
										<Typography.Text as='span' level={2} color='secondary'>
											*
										</Typography.Text>
									)}
								</Typography.Text>
								<Input
									width='full'
									borderRadius='md'
									type='text'
									value={formData.title}
									onChange={(e) =>
										setFormData((prev) => ({ ...prev, title: e.target.value }))
									}
									required
								/>
							</Stack>

							<Stack space='2'>
								<Typography.Text level={2} fontWeight='medium'>
									Description
									{!formData.description && (
										<Typography.Text as='span' level={2} color='secondary'>
											*
										</Typography.Text>
									)}
								</Typography.Text>
								<Textarea
									width='full'
									borderRadius='md'
									value={formData.description}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											description: e.target.value,
										}))
									}
									required
								/>
							</Stack>

							<Stack space='2'>
								<Typography.Text level={2} fontWeight='medium'>
									Category
									{!formData.category_id && (
										<Typography.Text as='span' level={2} color='secondary'>
											*
										</Typography.Text>
									)}
								</Typography.Text>
								<select
									value={formData.category_id}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											category_id: e.target.value,
										}))
									}
									className={styles.select}
									required
								>
									<option value=''>Select category</option>
									{categories?.allCategories.map((category) => (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									))}
								</select>
							</Stack>

							<Stack space='2'>
								<Typography.Text level={2} fontWeight='medium'>
									Location
									{!formData.address && (
										<Typography.Text as='span' level={2} color='secondary'>
											*
										</Typography.Text>
									)}
								</Typography.Text>
								<Stack space='1'>
									<Input
										type='text'
										width='full'
										borderRadius='md'
										value={formData.address || ''}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												address: e.target.value,
											}))
										}
										placeholder='Address'
									/>
									<Flex gap='2'>
										<Input
											type='number'
											width='full'
											borderRadius='md'
											value={formData.coordinates?.lat ?? 0}
											onChange={(e) =>
												setFormData((prev) => ({
													...prev,
													coordinates: {
														lat: Number(e.target.value) || 0,
														lng: prev.coordinates?.lng ?? 0,
													},
												}))
											}
											placeholder='Latitude'
											step='0.000001'
										/>
										<Input
											type='number'
											width='full'
											borderRadius='md'
											value={formData.coordinates?.lng ?? 0}
											onChange={(e) =>
												setFormData((prev) => ({
													...prev,
													coordinates: {
														lat: prev.coordinates?.lat ?? 0,
														lng: Number(e.target.value) || 0,
													},
												}))
											}
											placeholder='Longitude'
											step='0.000001'
										/>
									</Flex>
								</Stack>
							</Stack>
						</Stack>
					</Stack>

					{/* Additional Information */}
					<Stack flex='1'>
						<Flex align='center' gap='2' color='primary' marginBottom='4'>
							<HiTag size={20} />
							<Typography.Text level={1} fontWeight='semibold'>
								Additional Information
							</Typography.Text>
						</Flex>
						<Stack
							flex='1'
							padding='6'
							space='4'
							background='white'
							borderRadius='lg'
							boxShadow='primary'
						>
							<Stack space='2'>
								<Typography.Text level={2} fontWeight='medium'>
									Images
								</Typography.Text>
								<ImageUploader
									images={images}
									onChange={setImages}
									maxImages={4}
								/>
							</Stack>

							<Stack space='2'>
								<Typography.Text level={2} fontWeight='medium'>
									Tips
								</Typography.Text>
								{formData.tips?.map((tip, index) => (
									<Flex
										key={index}
										gap='2'
										marginBottom={
											index === formData.tips?.length - 1 ? '2' : '0'
										}
									>
										<Input
											width='full'
											borderRadius='md'
											type='text'
											value={tip}
											onChange={(e) => {
												const newTips = [...(formData.tips || [])];
												newTips[index] = e.target.value;
												setFormData((prev) => ({ ...prev, tips: newTips }));
											}}
											placeholder='Enter tip'
										/>
										<Button
											type='button'
											variant='outline'
											borderRadius='md'
											onClick={() => {
												const newTips = formData.tips?.filter(
													(_, i) => i !== index,
												);
												setFormData((prev) => ({ ...prev, tips: newTips }));
											}}
										>
											<MdDelete size={20} />
										</Button>
									</Flex>
								))}
								<Button
									variant='outline'
									borderRadius='md'
									prefix={<MdAdd size={20} />}
									onClick={() => {
										const newTips = [...(formData.tips || []), ''];
										setFormData((prev) => ({ ...prev, tips: newTips }));
									}}
								>
									Add Tip
								</Button>
							</Stack>

							<Stack space='2'>
								<Typography.Text level={2} fontWeight='medium'>
									Tags
								</Typography.Text>
								{formData.tags?.map((tag, index) => (
									<Flex key={index} gap='2' marginBottom='2'>
										<Input
											borderRadius='md'
											width='full'
											type='text'
											value={tag}
											onChange={(e) => {
												const newTags = [...(formData.tags || [])];
												newTags[index] = e.target.value;
												setFormData((prev) => ({ ...prev, tags: newTags }));
											}}
											placeholder='Enter tag'
										/>
										<Button
											variant='outline'
											borderRadius='md'
											onClick={() => {
												const newTags = formData.tags?.filter(
													(_, i) => i !== index,
												);
												setFormData((prev) => ({ ...prev, tags: newTags }));
											}}
										>
											<MdDelete size={20} />
										</Button>
									</Flex>
								))}
								<Button
									borderRadius='md'
									prefix={<MdAdd size={20} />}
									onClick={() => {
										const newTags = [...(formData.tags || []), ''];
										setFormData((prev) => ({ ...prev, tags: newTags }));
									}}
								>
									Add Tag
								</Button>
							</Stack>
						</Stack>
					</Stack>
				</Flex>
				<Flex justify='flex-end' gap='2' paddingY='4'>
					<Button
						type='submit'
						borderRadius='md'
						disabled={
							createSpotMutation.isPending || updateSpotMutation.isPending
						}
					>
						{isEditMode ? 'Update Spot' : 'Create Spot'}
					</Button>
				</Flex>
			</Box>
		</Container>
	);
};
