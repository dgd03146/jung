import { SelectItem } from './SelectItem';
import { SelectLabel } from './SelectLabel';
import { SelectMenu } from './SelectMenu';
import { SelectRoot } from './SelectRoot';
import { SelectTrigger } from './SelectTrigger';
export type { SelectProps } from './SelectRoot';

const SelectCompound = Object.assign(SelectRoot, {
	Trigger: SelectTrigger,
	Menu: SelectMenu,
	Item: SelectItem,
	Label: SelectLabel,
});
export { SelectCompound as Select };
