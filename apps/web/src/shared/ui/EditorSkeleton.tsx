import { Box } from '@jung/design-system/components';
import * as styles from './EditorSkeleton.css';

export const EditorSkeleton = () => {
	return (
		<div className={styles.editorSkeleton}>
			{/* 제목 블록 */}
			<Box
				className={styles.titleSkeleton}
				height='8'
				width='4/5'
				borderRadius='lg'
				background='gray'
			/>

			{/* 단락 블록들 */}
			<Box
				className={styles.paragraphSkeleton}
				height='4'
				width='full'
				borderRadius='md'
				background='gray'
			/>
			<Box
				className={styles.paragraphSkeleton}
				height='4'
				width='full'
				borderRadius='md'
				background='gray'
			/>
			<Box
				className={styles.shortParagraphSkeleton}
				height='4'
				width='3/5'
				borderRadius='md'
				background='gray'
			/>

			{/* 이미지 블록 */}
			<Box
				className={styles.imageSkeleton}
				height='56'
				width='full'
				borderRadius='xl'
				background='gray'
			/>

			{/* 단락 블록 */}
			<Box
				className={styles.paragraphSkeleton}
				height='4'
				width='full'
				borderRadius='md'
				background='gray'
			/>

			{/* 리스트 블록 */}
			<div className={styles.listSkeleton}>
				<Box
					className={styles.listItemSkeleton}
					height='4'
					width='3/4'
					borderRadius='md'
					background='gray'
				/>
				<Box
					className={styles.listItemSkeleton}
					height='4'
					width='4/5'
					borderRadius='md'
					background='gray'
				/>
				<Box
					className={styles.listItemSkeleton}
					height='4'
					width='3/4'
					borderRadius='md'
					background='gray'
				/>
			</div>

			{/* 코드 블록 */}
			<Box
				className={styles.codeSkeleton}
				height='10'
				width='full'
				borderRadius='lg'
				background='gray'
			/>

			{/* 마지막 단락 */}
			<Box
				className={styles.paragraphSkeleton}
				height='4'
				width='full'
				borderRadius='md'
				background='gray'
			/>
			<Box
				className={styles.shortParagraphSkeleton}
				height='4'
				width='2/5'
				borderRadius='md'
				background='gray'
			/>
		</div>
	);
};
