import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { HiCalendar, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import * as styles from './DatePicker.css';

interface CustomDatePickerProps {
	selected: Date | null;
	onChange: (date: Date | null) => void;
	placeholderText?: string;
}

// biome-ignore lint/suspicious/noExplicitAny: react-datepicker CustomInput prop type
const CustomInput = forwardRef<HTMLInputElement, any>(
	({ value, onClick }, ref) => (
		<div className={styles.inputWrapper}>
			<input
				value={value}
				onClick={onClick}
				ref={ref}
				readOnly
				className={styles.input}
				placeholder='날짜를 선택하세요'
			/>
			<HiCalendar className={styles.calendarIcon} />
		</div>
	),
);

CustomInput.displayName = 'CustomInput';

interface CustomHeaderProps {
	date: Date;
	decreaseMonth: () => void;
	increaseMonth: () => void;
	prevMonthButtonDisabled: boolean;
	nextMonthButtonDisabled: boolean;
}

const CustomHeader = ({
	date,
	decreaseMonth,
	increaseMonth,
	prevMonthButtonDisabled,
	nextMonthButtonDisabled,
}: CustomHeaderProps) => (
	<div className={styles.headerWrapper}>
		<button
			onClick={decreaseMonth}
			disabled={prevMonthButtonDisabled}
			className={styles.navButton}
			type='button'
		>
			<HiChevronLeft />
		</button>
		<div className={styles.currentMonth}>
			{date.toLocaleString('ko-KR', { year: 'numeric', month: 'long' })}
		</div>
		<button
			onClick={increaseMonth}
			disabled={nextMonthButtonDisabled}
			className={styles.navButton}
			type='button'
		>
			<HiChevronRight />
		</button>
	</div>
);

export const CustomDatePicker = ({
	selected,
	onChange,
	placeholderText,
}: CustomDatePickerProps) => {
	return (
		<div className={styles.container}>
			<DatePicker
				selected={selected}
				onChange={onChange}
				customInput={<CustomInput />}
				renderCustomHeader={CustomHeader}
				dateFormat='yyyy.MM.dd'
				placeholderText={placeholderText}
				showPopperArrow={false}
				wrapperClassName={styles.wrapper}
				calendarClassName={styles.calendar}
			/>
		</div>
	);
};
