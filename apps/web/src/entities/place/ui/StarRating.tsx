import { Flex } from '@jung/design-system/components';
import { useMemo } from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import * as styles from './StarRating.css';

interface StarRatingProps {
	value: number;
	max?: number;
	size?: 'sm' | 'md' | 'lg';
	readonly?: boolean;
	onChange?: (value: number) => void;
}

export function StarRating({
	value,
	max = 5,
	size = 'md',
	readonly = true,
	onChange,
}: StarRatingProps) {
	const stars = useMemo(() => {
		const stars = [];
		const fullStars = Math.floor(value);
		const hasHalfStar = value % 1 >= 0.5;

		for (let i = 0; i < max; i++) {
			if (i < fullStars) {
				stars.push('full');
			} else if (i === fullStars && hasHalfStar) {
				stars.push('half');
			} else {
				stars.push('empty');
			}
		}
		return stars;
	}, [value, max]);

	const handleClick = (index: number) => {
		if (!readonly && onChange) {
			onChange(index + 1);
		}
	};

	return (
		<Flex gap='1' className={styles.container({ interactive: !readonly })}>
			{stars.map((type, index) => (
				<button
					key={index}
					className={styles.star({ size })}
					onClick={() => handleClick(index)}
					type='button'
					disabled={readonly}
				>
					{type === 'full' && (
						<FaStar className={styles.icon({ filled: true })} />
					)}
					{type === 'half' && (
						<FaStarHalfAlt className={styles.icon({ filled: true })} />
					)}
					{type === 'empty' && (
						<FaRegStar className={styles.icon({ filled: false })} />
					)}
				</button>
			))}
		</Flex>
	);
}
