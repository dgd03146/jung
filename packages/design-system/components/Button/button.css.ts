import { recipe } from "@vanilla-extract/recipes";
import { sprinkles } from "styles/sprinkles.css";

export const button = recipe({
	base: sprinkles({
		// paddingY: {
		//   mobile: 'medium',
		//   tablet: 'large',
		// },
		// paddingX: {
		//   mobile: 'large',
		//   tablet: 'xlarge',
		// },
		// borderRadius: 'large',
	}),
	variants: {
		variant: {
			basic: sprinkles({
				backgroundColor: "transparent",
				paddingY: "0",
				paddingX: "0",
				margin: "0",
			}),
			solid: sprinkles({
				backgroundColor: "primary",
				color: "white",
			}),
			// transparent: sprinkles({
			// 	color: "gray-100",
			// 	backgroundColor: "blue",
			// }),
			// "black solid": sprinkles({
			// 	background: "black",
			// 	color: "white",
			// 	padding: "small",
			// }),
		},
	},
});
