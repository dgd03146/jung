import { useRef, useState } from 'react';
import { HiTag } from 'react-icons/hi';
import { HiPhoto } from 'react-icons/hi2';
import { MdCollections } from 'react-icons/md';
import * as styles from './NewPhoto.css';
import { MOCK_COLLECTIONS } from './PhotoCollection';

interface FormData {
	title: string;
	description: string;
	image: string | null;
	tags: string[];
	collection_id?: string;
}

export const NewPhoto = () => {
	const [formData, setFormData] = useState<FormData>({
		title: '',
		description: '',
		image: null,
		tags: [],
		collection_id: '',
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

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setFormData((prev) => ({
				...prev,
				image: imageUrl,
			}));
		}
	};

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	const handleCollectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		setFormData((prev) => ({
			...prev,
			collection_id: value,
		}));
	};

	const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const tags = e.target.value.split(',').map((tag) => tag.trim());
		setFormData((prev) => ({
			...prev,
			tags,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Implement save functionality
		console.log('Form submitted:', formData);
	};

	return (
		<div className={styles.pageWrapper}>
			{/* <div className={styles.header}>
        <h1 className={styles.title}>Add New Photo</h1>
      </div> */}

			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formLayout}>
					<div className={styles.imageSection}>
						<div className={styles.sectionTitle}>
							<HiPhoto size={20} />
							Image Upload
						</div>
						<div className={styles.uploadArea} onClick={handleUploadClick}>
							{formData.image ? (
								<img
									src={formData.image}
									alt='Preview'
									className={styles.previewImage}
								/>
							) : (
								<div className={styles.uploadPrompt}>
									<HiPhoto size={40} />
									<p className={styles.uploadPromptText}>
										Click to upload image
									</p>
									<span className={styles.uploadPromptSubtext}>
										or drag and drop
									</span>
								</div>
							)}
							<input
								type='file'
								ref={fileInputRef}
								onChange={handleFileChange}
								accept='image/*'
								className={styles.hiddenFileInput}
							/>
						</div>
					</div>

					<div className={styles.detailsSection}>
						<div className={styles.sectionTitle}>
							<MdCollections size={20} />
							Photo Details
						</div>

						<div className={styles.formCard}>
							<div className={styles.inputGroup}>
								<label className={styles.label}>Collection</label>
								<div className={styles.selectWrapper}>
									<select
										name='collection_id'
										value={formData.collection_id}
										onChange={handleCollectionChange}
										className={styles.select}
									>
										<option value=''>Select a collection</option>
										{MOCK_COLLECTIONS.map((collection) => (
											<option key={collection.id} value={collection.id}>
												{collection.title}
											</option>
										))}
									</select>
								</div>
							</div>

							<div className={styles.inputGroup}>
								<label className={styles.label}>Title</label>
								<input
									type='text'
									name='title'
									value={formData.title}
									onChange={handleInputChange}
									placeholder='Enter photo title'
									className={styles.input}
									required
								/>
							</div>

							<div className={styles.inputGroup}>
								<label className={styles.label}>Description</label>
								<textarea
									name='description'
									value={formData.description}
									onChange={handleInputChange}
									placeholder='Enter photo description'
									className={styles.textarea}
									rows={4}
								/>
							</div>

							<div className={styles.inputGroup}>
								<label className={styles.label}>
									<HiTag className={styles.labelIcon} />
									Tags
								</label>
								<input
									type='text'
									name='tags'
									value={formData.tags.join(', ')}
									onChange={handleTagsChange}
									placeholder='Enter tags (comma separated)'
									className={styles.input}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.formActions}>
					<button
						type='submit'
						className={styles.submitButton}
						disabled={!formData.title || !formData.image}
					>
						Upload Photo
					</button>
				</div>
			</form>
		</div>
	);
};
