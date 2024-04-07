import { createVar, style } from "@vanilla-extract/css";

import { sprinkles } from "../../styles/sprinkles.css";

export const focusedColor = createVar();

export const li = style([
	sprinkles({
		background: {
			hover: "primary200",
		},
	}),
	{
		background: focusedColor,
	},
]);
