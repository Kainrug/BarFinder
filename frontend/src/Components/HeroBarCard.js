import React from 'react'
import { Rating } from '@mui/material'
import { Link } from 'react-router-dom'
import { LocationFilled } from './Icons'

export const BarCard = ({ bar }) => (
	<Link
		to={`/bar/${bar.id}`}
		className='bg-white shadow-md rounded-lg p-4 flex items-center justify-between border border-gray-200 hover:shadow-lg transition-shadow'>
		<div className='flex items-center space-x-4'>
			<img
				src={bar.image_url || 'https://via.placeholder.com/100'}
				alt={bar.name}
				className='w-12 h-12 rounded-md object-cover border'
			/>
			<div>
				<h3 className='text-base font-semibold text-gray-800'>{bar.name}</h3>
				<div className='flex items-center mb-4'>
					<LocationFilled className='mr-2' />
					<p className='text-gray-500'>{bar.address}</p>
				</div>
			</div>
		</div>

		<div className='mb-4 flex items-center space-x-2'>
			<span className='font-bold text-sm text-gray-600'>{bar.averageRating}</span>
			<Rating name='read-only' value={bar.averageRating} readOnly />
			<span className='text-sm text-gray-600'>({bar.numberOfReviews})</span>
		</div>
	</Link>
)

export default BarCard
