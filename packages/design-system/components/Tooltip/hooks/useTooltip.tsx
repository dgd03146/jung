import { useEffect, useState } from 'react';

export const useTooltip = (tooltipId: string) => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	useEffect(() => {
		const storedData = localStorage.getItem('tooltipList');
		const tooltipList: { id: string; isVisible: boolean }[] = storedData
			? JSON.parse(storedData)
			: [];
		const tooltipState = tooltipList.find((item) => item.id === tooltipId);

		if (tooltipState) {
			setIsVisible(tooltipState.isVisible);
		} else {
			setIsVisible(true);
		}
	}, [tooltipId]);

	const handleClose = () => {
		const tooltipList = JSON.parse(localStorage.getItem('tooltipList') || '[]');

		if (tooltipList.includes(tooltipId)) return;

		tooltipList.push({ id: tooltipId, isVisible: false });
		localStorage.setItem('tooltipList', JSON.stringify(tooltipList));

		setIsVisible(false);
	};

	return { handleClose, isVisible };
};
