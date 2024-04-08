import {
	type Dispatch,
	type MutableRefObject,
	type PropsWithChildren,
	type SetStateAction,
	createContext,
	useContext,
	useRef,
	useState,
} from "react";

// key는 밖에서 넣어주는게 맞고.
// value랑 name? 근데 그 name도 밖에서 넣어주는게 맞는듯. label이 보여주는거.
// 대신 label을 안에서 결정하면 좋을 듯?
type Option = {
	value: string;
	label: string;
	isDisabled: boolean;
};

// FIXME: Provider랑 같이 중복으로 사용됨
type ReturnContext = {
	onValueChange?: (value: string) => void;
	open: boolean;
	defaultValue?: string;
	// placeholder?: string;
	setOpen: Dispatch<React.SetStateAction<boolean>>;
	selectedOption: Option;
	setSelectedOption: Dispatch<SetStateAction<Option>>;
	selectRef: MutableRefObject<HTMLElement | null> | null;
	setOptions: Dispatch<SetStateAction<Option[]>>;
	options: Option[];
};

const defaultValues: ReturnContext = {
	open: false,
	setOpen: () => {},
	selectedOption: {
		value: "",
		label: "",
		isDisabled: false,
	},
	setSelectedOption: () => {},
	onValueChange: () => {},
	defaultValue: "",
	// placeholder: '',
	selectRef: null,
	options: [],
	setOptions: () => {},
};

const SelectContext = createContext<ReturnContext>(defaultValues);

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
	valueProps: Partial<ReturnContext>;
}>) => {
	const { onValueChange, defaultValue } = valueProps;

	const [open, setOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState<Option>({
		value: "",
		label: "",
		isDisabled: false,
	});
	const [options, setOptions] = useState<Option[]>([]);
	const selectRef = useRef<HTMLElement | null>(null);

	return (
		<SelectContext.Provider
			value={{
				onValueChange,
				defaultValue,
				open,
				setOpen,
				selectedOption,
				setSelectedOption,
				selectRef,
				options,
				setOptions,
			}}
		>
			{children}
		</SelectContext.Provider>
	);
};

export default SelectProvider;
