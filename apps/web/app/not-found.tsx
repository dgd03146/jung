/*
 * Not-Found page should have a layout as well, that's why it is placed directly
 * in the app/ folder together with the main layout.tsx
 * Unfortunately, the useDictionary hook cannot be used on this page
 * because the app/layout.tsx and app/not-found.tsx cannot be placed in app/(routing)/[lang]/ folder
 */
const NotFound = () => {
	return <div>404 - Not Found Page</div>;
};
export default NotFound;
