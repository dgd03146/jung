import type { Collection } from '@jung/shared/types';
import { Link } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { HiPencil, HiPhoto, HiPlus, HiTrash } from 'react-icons/hi2';
import * as styles from './PhotoCollection.css';

export const MOCK_COLLECTIONS: Collection[] = [
	{
		id: '1',
		title: '2024 봄 화보',
		description: '2024년 봄 시즌 메인 화보 컬렉션',
		cover_image: 'https://picsum.photos/800/600?random=1',
		photo_count: 24,
		created_at: '2024-03-15T09:00:00Z',
	},
	{
		id: '2',
		title: '제품 상세컷',
		description: '제품 상세 페이지용 사진 모음',
		cover_image: 'https://picsum.photos/800/600?random=2',
		photo_count: 156,
		created_at: '2024-03-10T09:00:00Z',
	},
	{
		id: '3',
		title: '브랜드 아이덴티티',
		description: '브랜드 로고 및 아이덴티티 디자인 이미지',
		cover_image: 'https://picsum.photos/800/600?random=3',
		photo_count: 42,
		created_at: '2024-03-08T09:00:00Z',
	},
	{
		id: '4',
		title: '이벤트 현장',
		description: '2024 신년 행사 현장 스케치',
		cover_image: 'https://picsum.photos/800/600?random=4',
		photo_count: 89,
		created_at: '2024-03-05T09:00:00Z',
	},
	{
		id: '5',
		title: '소셜미디어',
		description: 'SNS 마케팅용 이미지 컬렉션',
		cover_image: 'https://picsum.photos/800/600?random=5',
		photo_count: 234,
		created_at: '2024-03-01T09:00:00Z',
	},
	{
		id: '6',
		title: '직원 프로필',
		description: '임직원 프로필 사진 모음',
		cover_image: 'https://picsum.photos/800/600?random=6',
		photo_count: 67,
		created_at: '2024-02-28T09:00:00Z',
	},
	{
		id: '7',
		title: '오피스 전경',
		description: '회사 사무실 및 작업 공간 사진',
		cover_image: 'https://picsum.photos/800/600?random=7',
		photo_count: 45,
		created_at: '2024-02-25T09:00:00Z',
	},
	{
		id: '8',
		title: '2024 신제품',
		description: '신제품 라인업 프로모션 이미지',
		cover_image: 'https://picsum.photos/800/600?random=8',
		photo_count: 128,
		created_at: '2024-02-20T09:00:00Z',
	},
	{
		id: '9',
		title: '광고 캠페인',
		description: '2024 봄 시즌 광고 캠페인 이미지',
		cover_image: 'https://picsum.photos/800/600?random=9',
		photo_count: 93,
		created_at: '2024-02-15T09:00:00Z',
	},
	{
		id: '10',
		title: '고객 후기',
		description: '제품 사용 고객 후기 이미지',
		cover_image: 'https://picsum.photos/800/600?random=10',
		photo_count: 167,
		created_at: '2024-02-10T09:00:00Z',
	},
	{
		id: '11',
		title: '매장 인테리어',
		description: '전국 매장 인테리어 사진 모음',
		cover_image: 'https://picsum.photos/800/600?random=11',
		photo_count: 78,
		created_at: '2024-02-05T09:00:00Z',
	},
	{
		id: '12',
		title: '패키지 디자인',
		description: '제품 패키지 디자인 이미지',
		cover_image: 'https://picsum.photos/800/600?random=12',
		photo_count: 56,
		created_at: '2024-02-01T09:00:00Z',
	},
];

interface FormData {
	title: string;
	description: string;
	cover_image: string;
}

export const PhotoCollection = () => {
	const [collections, setCollections] =
		useState<Collection[]>(MOCK_COLLECTIONS);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [formData, setFormData] = useState<FormData>({
		title: '',
		description: '',
		cover_image: '',
	});
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleCloseModal = () => {
		setEditingId(null);
		setFormData({
			title: '',
			description: '',
			cover_image: '',
		});
	};

	const handleSave = () => {
		// TODO: Implement save functionality
		handleCloseModal();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// 실제 구현에서는 이미지 업로드 API를 호출하여 URL을 받아야 합니다
			const imageUrl = URL.createObjectURL(file);
			setFormData((prev) => ({
				...prev,
				cover_image: imageUrl,
			}));
		}
	};

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.mainSection}>
				<div className={styles.header}>
					<h2 className={styles.title}>Collection Management</h2>
					<button
						className={styles.addButton}
						onClick={() => setEditingId('new')}
					>
						<HiPlus />
						New Collection
					</button>
				</div>

				<div className={styles.gridView}>
					{collections.map((collection) => (
						<Link
							key={collection.id}
							to='/gallery/collections/$collectionId'
							params={{ collectionId: collection.id }}
							className={styles.collectionLink}
						>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className={styles.collectionCard}
							>
								<div className={styles.imageContainer}>
									<img
										src={collection.cover_image}
										alt={collection.title}
										className={styles.image}
									/>
									<div className={styles.actions}>
										<button
											className={styles.actionButton}
											onClick={(e) => {
												e.preventDefault();
												setEditingId(collection.id);
											}}
										>
											<HiPencil size={16} />
										</button>
										<button
											className={styles.actionButton}
											onClick={(e) => {
												e.preventDefault();
												// handleDelete(collection.id)
											}}
										>
											<HiTrash size={16} />
										</button>
									</div>
								</div>
								<div className={styles.content}>
									<h3 className={styles.title}>{collection.title}</h3>
									<p className={styles.description}>{collection.description}</p>
								</div>
								<div className={styles.footer}>
									<span className={styles.photoCount}>
										{collection.photo_count} photos
									</span>
									<span className={styles.date}>
										{new Date(collection.created_at).toLocaleDateString(
											'ko-KR',
										)}
									</span>
								</div>
							</motion.div>
						</Link>
					))}
				</div>
			</div>

			<AnimatePresence>
				{editingId && (
					<motion.div
						className={styles.modalOverlay}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={handleCloseModal}
					>
						<motion.div
							className={styles.modalContent}
							initial={{ scale: 0.9, y: 20 }}
							animate={{ scale: 1, y: 0 }}
							exit={{ scale: 0.9, y: 20 }}
							onClick={(e) => e.stopPropagation()}
						>
							<h3 className={styles.modalTitle}>
								{editingId === 'new'
									? 'Create New Collection'
									: 'Edit Collection'}
							</h3>
							<div className={styles.formGroup}>
								<div className={styles.inputGroup}>
									<label className={styles.inputLabel}>Title</label>
									<input
										type='text'
										name='title'
										value={formData.title}
										onChange={handleInputChange}
										placeholder='Enter collection title'
										className={styles.input}
										required
									/>
								</div>
								<div className={styles.inputGroup}>
									<label className={styles.inputLabel}>Description</label>
									<textarea
										name='description'
										value={formData.description}
										onChange={handleInputChange}
										placeholder='Enter collection description'
										className={styles.textarea}
										rows={4}
									/>
								</div>
								<div className={styles.inputGroup}>
									<label className={styles.inputLabel}>Cover Image</label>
									<div className={styles.imageUploadContainer}>
										<input
											type='text'
											name='cover_image'
											value={formData.cover_image}
											onChange={handleInputChange}
											placeholder='Enter cover image URL'
											className={styles.input}
										/>
										<input
											type='file'
											ref={fileInputRef}
											onChange={handleFileChange}
											accept='image/*'
											className={styles.hiddenFileInput}
										/>
										<button
											type='button'
											onClick={handleUploadClick}
											className={styles.uploadButton}
										>
											<HiPhoto size={20} />
											Upload
										</button>
									</div>
									{formData.cover_image && (
										<div className={styles.imagePreview}>
											<img
												src={formData.cover_image}
												alt='Cover preview'
												className={styles.previewImage}
											/>
										</div>
									)}
								</div>
							</div>
							<div className={styles.modalActions}>
								<button
									className={styles.cancelButton}
									onClick={handleCloseModal}
								>
									Cancel
								</button>
								<button
									className={styles.saveButton}
									onClick={handleSave}
									disabled={!formData.title}
								>
									Save
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
