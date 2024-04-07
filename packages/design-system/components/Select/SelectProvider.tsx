import {
	type Dispatch,
	type PropsWithChildren,
	type ReactNode,
	createContext,
	useContext,
} from "react";

// FIXME: 중복으로 사용됨
// TODO: options 제네릭으로 해야 여러가지 데이터 받을 수 있음?
type Props = {
	onValueChange?: (value: string) => void;
	open: boolean;
	defaultValue?: string;
	setOpen: Dispatch<React.SetStateAction<boolean>>;
	value: string;
	setValue: Dispatch<React.SetStateAction<string>>;
};

const SelectContext = createContext<Props | null>(null);

export const useSelectContext = () => {
	const context = useContext(SelectContext);
	if (!context) {
		throw Error("It should be rendered in Select component");
	}
	return context;
};

const SelectProvider = ({
	children,
	valueProps,
}: PropsWithChildren<{
	valueProps: Props;
}>) => {
	return (
		<SelectContext.Provider value={valueProps}>
			{children}
		</SelectContext.Provider>
	);
};

export default SelectProvider;
