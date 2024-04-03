import { recipe } from "@vanilla-extract/recipes";
import { base } from "../../styles/reset.css";
import { sprinkles } from "../../styles/sprinkles.css";

export const button = recipe({
	base: [
		sprinkles({
			paddingX: "2.5",
			paddingY: "1.5",
			borderColor: "primary",
			borderWidth: "1px",
			borderStyle: "solid",
			color: "primary",
		}),
	],
	variants: {
		variant: {
			primary: sprinkles({
				background: {
					base: "white",
					hover: "primary200",
				},
				color: {
					hover: "white",
				},
			}),
			secondary: sprinkles({
				background: {
					base: "primary",
					hover: "primary200",
				},
				color: {
					base: "white",
					hover: "white",
				},
			}),
			outline: sprinkles({
				borderColor: "gray-100",
				background: {
					base: "white",
					hover: "primary200",
				},
				color: {
					hover: "white",
				},
			}),
			rounded: sprinkles({
				borderRadius: "2xl",
				background: {
					base: "white",
					hover: "primary200",
				},
				color: {
					hover: "white",
				},
			}),
			ghost: sprinkles({
				border: "none",
				fontWeight: "bold",
				background: {
					base: "transparent",
					hover: "primary200",
				},
				color: {
					hover: "white",
				},
			}),
		},
	},
});
