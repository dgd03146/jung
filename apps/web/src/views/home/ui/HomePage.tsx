'use client';

import { useDictionary } from '@/fsd/shared';

const HomePage = () => {
	const { dictionary } = useDictionary();

	return (
		<div className='h-[30rem] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center'>
			<div className='text-center p-8 bg-white bg-opacity-80 rounded-lg shadow-md'>
				<h1 className='font-bold text-4xl mb-4 text-gray-900'>
					{dictionary.home.hello}
				</h1>
			</div>
		</div>
	);
};

export default HomePage;
