import { Tabs } from './Tabs';
import { TabsContent } from './TabsContent';
import { TabsList } from './TabsList';
import { TabsTrigger } from './TabsTrigger';

const CompoundTabs = Object.assign(Tabs, {
	List: TabsList,
	Trigger: TabsTrigger,
	Content: TabsContent,
});

export { CompoundTabs as Tabs };
