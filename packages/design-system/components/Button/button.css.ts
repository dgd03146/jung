import { recipe } from "@vanilla-extract/recipes";
import { sprinkles } from "../../styles/sprinkles.css";

export const button = recipe({
	base: [
		sprinkles({
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
		size: {
			sm: sprinkles({
				paddingX: "2.5",
				paddingY: "1.5",
			}),
			md: sprinkles({
				paddingX: "3",
				paddingY: "2",
			}),
			lg: sprinkles({
				paddingX: "3.5",
				paddingY: "2.5",
			}),
		},
		rounded: {
			true: sprinkles({
				borderRadius: "2xl",
			}),
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "sm",
		rounded: false,
	},
});
