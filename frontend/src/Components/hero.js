import React from 'react'
import MapComponent from './MapBox'

const Hero = () => {
	return (
		<div className='flex h-screen'>
			{/* Sidebar */}
			<div className='w-1/3 bg-gray-100 dark:bg-neutral-800 p-6 overflow-y-auto'>
				<h2 className='text-2xl font-semibold text-black dark:text-white mb-6'>Lista Barów</h2>
				<p className='text-sm text-neutral-600 dark:text-neutral-400 mb-4'>
					Kliknij na bar w liście lub marker na mapie, aby zobaczyć szczegóły.
				</p>
				{/* Placeholder na listę barów */}
				<ul className='space-y-4'>
					<li className='p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20 border-blue-500 hover:shadow-lg'>
						<h3 className='text-lg font-medium text-black dark:text-white'>Nazwa Baru</h3>
						<p className='text-sm text-neutral-600 dark:text-neutral-400'>Miasto baru</p>
					</li>
					<li className='p-4 border rounded-lg bg-neutral-200 dark:bg-neutral-700 hover:shadow-lg'>
						<h3 className='text-lg font-medium text-black dark:text-white'>Nazwa Baru 2</h3>
						<p className='text-sm text-neutral-600 dark:text-neutral-400'>Miasto baru 2</p>
					</li>
				</ul>
			</div>

			{/* Map */}
			<div className='w-2/3 relative'>
				<MapComponent /> {/* Używamy Twojego komponentu mapy */}
				{/* Gradientowy pasek na dole */}
				<div className='absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent'></div>
			</div>
		</div>
	)
}

export default Hero
