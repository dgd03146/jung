import { globalStyle } from "@vanilla-extract/css";

globalStyle("body", {
	padding: 0,
	margin: 0,
	boxSizing: "border-box",
});

globalStyle("a", {
	textDecoration: "none",
});

globalStyle("list", {
	padding: "0",
	listStyle: "none",
});

globalStyle("input", {
	border: "none",
	outline: "none",
});

globalStyle("button", {
	border: "none",
	outline: "none",
	cursor: "pointer",
});
