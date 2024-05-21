import { Select } from './Select';
import { SelectItem } from './SelectItem';
import { SelectLabel } from './SelectLabel';
import { SelectMenu } from './SelectMenu';
import { SelectTrigger } from './SelectTrigger';

const SelectCompound = Object.assign(Select, {
	Trigger: SelectTrigger,
	Menu: SelectMenu,
	Item: SelectItem,
	Label: SelectLabel,
});
export { SelectCompound as Select };
