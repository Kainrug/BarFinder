import React from 'react'
import MapComponent from './MapBox'
import HeroBarList from './HeroBarList'

const HeroPage = () => {
	return (
		<div className='container mx-auto px-4 py-8 bg-gray-100'>
			<div className='flex'>
				{/* Left side: Bar List */}
				<div className='w-1/2 pr-4' style={{ maxHeight: '100vh', overflowY: 'auto' }}>
					<HeroBarList />
				</div>
				{/* Right side: Map */}
				<div className='w-1/2 h-screen mt-10'>
					<div className='sticky top-0 h-[600px]'>
						<MapComponent />
					</div>
				</div>
			</div>
		</div>
	)
}

export default HeroPage
