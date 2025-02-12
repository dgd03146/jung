// This file defines the structure of the dictionary object used in the application.
// The structure should match the content of the dictionaries (e.g., en.json) to ensure consistency.
// You can just copy the content from one of the dictionaries
// This helps in getting type suggestions when using the 'dictionary' object provided by the Context API.
// Imagine your dictionaries are much more complex..
export type DictionaryType = {
	home: {
		hello: 'Hello, friend';
	};
	about: {
		about_text: 'This is the about page.';
	};
};
