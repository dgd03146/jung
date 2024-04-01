import { breakpoints } from "./breakPoints";

export const space = {
	"0": "0px",
	"0.5": "2px", // 2px
	"1": "4px", // 4px
	"1.5": "6px", // 6px
	"2": "8px", // 8px
	"2.5": "10px", // 10px
	"3": "12px", // 12px
	"3.5": "14px", // 14px
	"4": "16px", // 16px
	"4.5": "18px",
	"5": "20px", // 20px
	"6": "24px", // 24px
	"7": "28px", // 28px
	"8": "32px", // 32px
	"9": "36px", // 36px
	"10": "40px", // 40px
	"11": "44px", // 44px
	"12": "48px", // 48px
	"14": "56px", // 56px
	"16": "64px", // 64px
	"20": "80px", // 80px
	"24": "96px", // 96px
	"28": "112px", // 112px
	"32": "128px", // 128px
	"36": "144px", // 144px
	"40": "160px", // 160px
	"44": "176px", // 176px
	"48": "192px", // 192px
	"52": "208px", // 208px
	"56": "224px", // 224px
	"60": "240px", // 240px
	"64": "256px", // 256px
	"72": "288px", // 288px
	"76": "304px", // 304px
	"80": "320px", // 320px
	"96": "384px", // 384

	auto: "auto",
	full: "100%",

	fit: "fit-content",
	max: "max-content",
	min: "min-content",

	screenDvh: "100dvh",
	screenDvw: "100dvw",
	screenVh: "100vh",
	screenVw: "100vw",
};

export const extendedSpace = {
	"1/5": "20%",
	"1/4": "25%",
	"1/3": "33.333333%",
	"2/5": "40%",
	"1/2": "50%",
	"3/5": "60%",
	"2/3": "66.666667%",
	"3/4": "75%",
	"4/5": "80%",
	"11/12": "92%",

	screenSm: breakpoints.sm,
	screenMd: breakpoints.md,
	screenLg: breakpoints.lg,
	screenXl: breakpoints.xl,
	screen2Xl: breakpoints["2xl"],
};
