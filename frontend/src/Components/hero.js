import React from 'react'
import MapComponent from './MapBox'
import HeroBarList from './HeroBarList'

const HeroPage = () => {
	return (
		<div
			className='min-h-screen flex items-center justify-center bg-cover bg-center px-4'
			style={{
				backgroundImage: "url('https://cdn.pixabay.com/photo/2015/07/31/20/41/background-869596_1280.png')",
			}}>
			<div className='container mx-auto bg-gray-100 px-6 py-8 rounded-lg shadow-lg'>
				<div className='flex'>
					{/* Left side: Bar List */}
					<div className='w-1/2 pr-4' style={{ maxHeight: '600px', overflowY: 'auto' }}>
						<HeroBarList />
					</div>
					{/* Right side: Map */}
					<div className='w-1/2 ml-5'>
						<div className='h-[600px]'>
							<MapComponent />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HeroPage
