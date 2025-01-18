import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles';

/**
 * Typography Heading
 * - h1: 48px (5xl) - 페이지 타이틀
 * - h2: 36px (4xl) - 주요 섹션 제목
 * - h3: 32px (3xl) - 섹션 제목
 * - h4: 24px (2xl) - 서브 섹션 제목
 * - h5: 20px (xl) - 작은 제목
 */
export const heading = recipe({
	base: [
		sprinkles({
			fontWeight: 'semibold',
		}),
	],
	variants: {
		variant: {
			hero: style([
				sprinkles({
					fontWeight: 'bold',
					color: 'primary',
					marginBottom: {
						mobile: '4',
						tablet: '5',
						desktop: '6',
					},
					fontSize: {
						mobile: '7xl', // 72px
						tablet: '8xl', // 96px
						desktop: '9xl', // 128px
					},
					lineHeight: {
						mobile: '17', // 6rem
						tablet: '18', // 7rem
						desktop: '19', // 11.5rem
					},
				}),
				{
					fontWeight: 900,
					letterSpacing: '-0.03em',
					textTransform: 'uppercase',

					WebkitTextStroke: '2px #0142C0',

					background: 'linear-gradient(180deg, #0142C0 0%, #002766 100%)',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',

					textShadow: `
						2px 2px 0 #0142C0,
						-2px -2px 0 #0142C0,
						2px -2px 0 #0142C0,
						-2px 2px 0 #0142C0,
						4px 4px 0px rgba(1, 66, 192, 0.3)
					`,
				},
			]),
		},
		level: {
			1: style([
				sprinkles({
					fontWeight: 'bold',
					fontSize: {
						mobile: '4xl', // 36px
						tablet: '4xl', // 36px
						desktop: '5xl', // 48px
					},
					lineHeight: {
						mobile: '10', // 40px
						tablet: '12', // 48px
						desktop: '14', // 56px
					},
				}),
			]),
			2: style([
				sprinkles({
					fontWeight: 'semibold',
					fontSize: {
						mobile: '3xl', // 32px
						tablet: '3xl', // 32px
						desktop: '4xl', // 36px
					},
					lineHeight: {
						mobile: '8', // 32px
						tablet: '9', // 36px
						desktop: '10', // 40px
					},
				}),
			]),
			3: style([
				sprinkles({
					fontWeight: 'semibold',
					fontSize: {
						mobile: '2xl', // 24px
						tablet: '2xl', // 24px
						desktop: '3xl', // 32px
					},
					lineHeight: {
						mobile: '7', // 28px
						tablet: '7', // 28px
						desktop: '8', // 28px
					},
				}),
			]),
			4: style([
				sprinkles({
					fontWeight: 'semibold',
					fontSize: {
						mobile: 'xl', // 20px
						tablet: 'xl', // 20px
						desktop: '2xl', // 24px
					},
					lineHeight: {
						mobile: '6', // 24px
						tablet: '6', // 24px
						desktop: '7', // 28px
					},
				}),
			]),
			5: style([
				sprinkles({
					fontWeight: 'semibold',
					fontSize: {
						mobile: 'xl', // 20px
						tablet: 'xl', // 20px
						desktop: 'xl', // 20px
					},
					lineHeight: {
						mobile: '6', // 24px
						tablet: '6', // 24px
						desktop: '6', // 24px
					},
				}),
			]),
		},
	},
	compoundVariants: [
		{
			variants: {
				level: 1,
			},
			style: sprinkles({
				fontWeight: 'bold',
			}),
		},
	],
});

/**
 * Typography Text
 * - level1: 18px (lg) - 강조 본문
 * - level2: 16px (base) - 기본 본문
 * - level3: 15px (md) - 중간 본문
 * - level4: 14px (sm) - 작은 본문
 */
const truncateStyles = {
	multiline: (lines: number) =>
		style({
			display: '-webkit-box',
			WebkitLineClamp: lines,
			WebkitBoxOrient: 'vertical',
			overflow: 'hidden',
		}),
	singleline: style({
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	}),
};

export const text = recipe({
	base: [
		sprinkles({
			letterSpacing: 'normal',
		}),
	],
	variants: {
		level: {
			1: sprinkles({
				fontSize: {
					mobile: 'base', // 16px
					tablet: 'lg', // 18px
					desktop: 'lg', // 18px
				},
				lineHeight: {
					mobile: '6', // 24px
					tablet: '6.5', // 26px
					desktop: '6.5', // 26px
				},
			}),
			2: sprinkles({
				fontSize: {
					mobile: 'sm', // 14px
					tablet: 'base', // 16px
					desktop: 'base', // 16px
				},
				lineHeight: {
					mobile: '5.5', // 22px
					tablet: '6', // 24px
					desktop: '6', // 24px
				},
			}),

			3: sprinkles({
				fontSize: {
					mobile: 'xs', // 13px
					tablet: 'sm', // 14px
					desktop: 'md', // 15px
				},
				lineHeight: {
					mobile: '5', // 20px
					tablet: '5.5', // 22px
					desktop: '5.5', // 22px
				},
			}),

			4: sprinkles({
				fontSize: {
					mobile: 'xxs', // 12px
					tablet: 'xs', // 13px
					desktop: 'sm', // 14px
				},
				lineHeight: {
					mobile: '4', // 16px
					tablet: '5', // 20px
					desktop: '5', // 20px
				},
			}),
		},
		inline: {
			true: sprinkles({
				display: 'inline-block',
			}),
		},
		truncate: {
			none: {},
			single: truncateStyles.singleline,
			two: truncateStyles.multiline(2),
			three: truncateStyles.multiline(3),
		},
	},
	defaultVariants: {
		level: 2,
		truncate: 'none',
	},
});

/**
 * Typography SubText (보조 설명 텍스트)
 * - level1: 14px (sm) - 큰 보조 텍스트
 * - level2: 13px (xs) - 일반 보조 텍스트
 * - level3: 12px (xxs) - 작은 보조 텍스트
 */
export const subText = recipe({
	base: sprinkles({}),
	variants: {
		level: {
			1: sprinkles({
				fontSize: 'sm', // 14px
				lineHeight: '5.5', // 22px
			}),
			2: sprinkles({
				fontSize: 'xs', // 13px
				lineHeight: '5', // 20px
			}),
			3: sprinkles({
				fontSize: 'xxs', // 12px
				lineHeight: '5', // 20px
			}),
		},
		inline: {
			true: sprinkles({
				display: 'inline-block',
			}),
		},

		truncate: {
			none: {},
			single: truncateStyles.singleline,
			two: truncateStyles.multiline(2),
			three: truncateStyles.multiline(3),
		},
	},
});

/**
 * Typography FootNote (주석/법적 고지)
 * - level1: 12px (xxs) - 강조된 주석
 * - level2: 10px (xxxs) - 기본 주석
 * - level3: 8px (mini) - 초소형 주석 (법적 고지, 워터마크 등)
 */
export const footNote = recipe({
	base: sprinkles({
		lineHeight: '4', // 16px
	}),

	variants: {
		level: {
			1: sprinkles({
				fontSize: 'xxs', // 12px
				lineHeight: '4', // 16px
			}),
			2: sprinkles({
				fontSize: 'xxxs', // 10px

				lineHeight: '3', // 12px
			}),
			3: sprinkles({
				fontSize: {
					mobile: 'xxxs', // 10px
					tablet: 'xxxs', // 10px
					desktop: 'xxxs', // 10px
				},
				lineHeight: {
					mobile: '3', // 12px
					tablet: '2', // 10px
					desktop: '2', // 10px
				},
			}),
		},
	},
});
