'use client';

import { Checkbox } from '@jung/design-system/components';
import { useState } from 'react';

const CheckBoxTest = () => {
	const [checked, setChecked] = useState(false);
	const handleChecked = () => {
		setChecked(!checked);
	};

	return (
		<Checkbox checked={checked} onChange={handleChecked}>
			체크 박스 테스트
		</Checkbox>
	);
};

export default CheckBoxTest;
