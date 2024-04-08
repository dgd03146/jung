import { createVar, style } from "@vanilla-extract/css";

import { sprinkles } from "../../styles/sprinkles.css";

// export const selectedColor = createVar();

export const li = style([
	sprinkles({
		background: {
			base: "primary100",
			hover: "primary",
			focus: "primary",
		},

		outlineColor: {
			focus: "primary",
		},
	}),
	{
		// background: selectedColor,

		outlineStyle: "1px",
	},
]);
