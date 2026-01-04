import type {
	ComponentPropsWithoutRef,
	ComponentPropsWithRef,
	ElementType,
	PropsWithChildren,
} from 'react';

/**
 * Polymorphic component의 ref 타입을 정의합니다.
 * @template C - 컴포넌트의 기본 HTML 엘리먼트 타입
 */
export type PolymorphicRef<C extends ElementType> =
	ComponentPropsWithRef<C>['ref'];

/**
 * 'as' prop의 타입을 정의합니다.
 * @template C - 변환하고자 하는 엘리먼트 타입
 */
export type AsProp<C extends ElementType> = {
	as?: C;
};

/**
 * 중복되는 prop 키들을 제거하기 위한 유틸리티 타입
 * @template C - 컴포넌트의 기본 HTML 엘리먼트 타입
 * @template P - 컴포넌트의 추가 props 타입
 */
export type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

/**
 * ref가 없는 Polymorphic 컴포넌트의 props 타입
 * @template C - 컴포넌트의 기본 HTML 엘리먼트 타입
 * @template Props - 컴포넌트의 추가 props 타입
 */
export type PolymorphicComponentProp<
	C extends ElementType,
	Props = Record<string, unknown>,
> = PropsWithChildren<Props & AsProp<C>> &
	Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

/**
 * ref를 포함한 Polymorphic 컴포넌트의 props 타입
 * @template C - 컴포넌트의 기본 HTML 엘리먼트 타입
 * @template Props - 컴포넌트의 추가 props 타입
 */
export type PolymorphicComponentPropWithRef<
	C extends ElementType,
	Props = Record<string, unknown>,
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

// 유용한 타입 가드 추가
export type ExtractProps<T> = T extends ElementType<infer P> ? P : never;
