import { Children, isValidElement } from 'react';

interface ChildProps {
	children?: React.ReactNode;
}

export const useSelect = () => {
	const getChildText = (children: React.ReactNode) => {
		let childText = '';
		if (children) {
			Children.forEach(children, (child) => {
				if (isValidElement<ChildProps>(child)) {
					return typeof child.props.children === 'string'
						? // biome-ignore lint/suspicious/noAssignInExpressions: intentional assignment
							(childText += child.props.children)
						: // biome-ignore lint/suspicious/noAssignInExpressions: intentional assignment
							(childText += getChildText(child.props.children));
				}
				if (typeof child === 'string') {
					childText += child;
				} else if (typeof child === 'number') {
					childText += String(childText);
				}
			});
		}
		return childText;
	};

	return { getChildText };
};
