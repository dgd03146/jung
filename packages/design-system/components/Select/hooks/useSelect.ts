import { Children, isValidElement } from "react";

export const useSelect = () => {
	const getChildText = (children: React.ReactNode) => {
		let childText = "";
		if (children) {
			Children.forEach(children, (child) => {
				if (isValidElement(child)) {
					return typeof child.props.children === "string"
						? // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
						  (childText += child.props.children)
						: // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
						  (childText += getChildText(child.props.children));
				}
				if (typeof child === "string") {
					childText += child;
				} else if (typeof child === "number") {
					childText += String(childText);
				}
			});
		}
		return childText;
	};

	return { getChildText };
};
