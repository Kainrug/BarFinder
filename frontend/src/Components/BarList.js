import React, { useState, useEffect } from 'react'
import { Rating } from '@mui/material'
import CityDropdown from './Dropdown'
import { LocationFilled, Sort, Filter } from './Icons'
import axiosInstance from '../Api/axios'
import { Grid2 } from '@mui/material'
import { Link } from 'react-router-dom'

const BarsList = () => {
	const [bars, setBars] = useState([])
	const [filters, setFilters] = useState({
		city: '',
		sortBy: 'createdAt',
		order: 'DESC',
	})
	const [sortMenuOpen, setSortMenuOpen] = useState(false)
	const [localFilters, setLocalFilters] = useState(filters)
	const [selectedSortOption, setSelectedSortOption] = useState('Najnowsze')

	const toggleSortMenu = () => {
		setSortMenuOpen(prevState => !prevState)
	}

	const handleSortSelection = (sortBy, order, option) => {
		setLocalFilters(prevFilters => ({
			...prevFilters,
			sortBy,
			order,
		}))
		setSelectedSortOption(option)
		setSortMenuOpen(false)
	}

	const handleCityChange = city => {
		const cityFilter = city === 'Brak filtrowania' ? '' : city
		setLocalFilters(prevFilters => ({
			...prevFilters,
			city: cityFilter,
		}))
	}

	const fetchBars = async () => {
		try {
			const response = await axiosInstance.get('/bars', { params: localFilters })
			setBars(response.data)
		} catch (error) {
			console.error('Error fetching bars:', error)
		}
	}

	const handleApplyFilters = () => {
		setFilters(localFilters)
		fetchBars()
	}

	useEffect(() => {
		fetchBars()
	}, [filters])

	return (
		<div className='mt-16 px-4 '>
			{/* Filters Section */}
			<div className='filters flex justify-between items-center gap-4 mb-6'>
				<div className='flex items-center gap-4'>
					{/* Location Icon and City Filter */}
					<div className='flex items-center gap-2'>
						<LocationFilled className='w-5 h-5 text-gray-600' />
						<p className='city-filter-text'>Filtruj po mieście:</p>
					</div>
					<CityDropdown onCityChange={handleCityChange} />

					{/* Sort Filter */}
					<div className='relative'>
						<button
							className='flex items-center gap-1 px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200'
							onClick={toggleSortMenu}>
							{selectedSortOption}
							<Sort className='w-5 h-5 text-gray-500' />
						</button>
						{sortMenuOpen && (
							<div className='absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10'>
								<button
									onClick={() => handleSortSelection('createdAt', 'DESC', 'Najnowsze')}
									className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'>
									Najnowsze
								</button>
								<button
									onClick={() => handleSortSelection('averageRating', 'DESC', 'Najlepiej oceniane')}
									className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'>
									Najlepiej oceniane
								</button>
								<button
									onClick={() => handleSortSelection('createdAt', 'ASC', 'Najstarsze')}
									className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'>
									Najstarsze
								</button>
								<button
									onClick={() => handleSortSelection('averageRating', 'ASC', 'Najgorzej oceniane')}
									className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'>
									Najgorzej oceniane
								</button>
							</div>
						)}
					</div>
					<button
						className='inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white'
						onClick={handleApplyFilters}>
						Filtruj
						<Filter className='w-5 h-5' />
					</button>
				</div>
			</div>

			{/* Bars Grid Section */}
			<Grid2 container spacing={4} justifyContent='center' className='mt-10'>
				{bars.map(bar => (
					<Grid2 item key={bar.id} xs={12} sm={6} md={4} lg={3}>
						<div
							className='max-w-sm bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transform transition duration-300 ease-in-out'
							style={{ width: '300px', height: '450px' }}>
							{/* Obrazek */}
							<a href='#'>
								<img
									className='w-full h-48 object-cover hover:scale-110 transition-all duration-300 ease-in-out'
									src={bar.image_url || 'https://via.placeholder.com/300'}
									alt={bar.name}
									style={{ height: '200px', objectFit: 'cover' }}
								/>
							</a>
							<div className='p-4 flex flex-col justify-between h-[calc(100%-200px)]'>
								<a href='#'>
									<h5 className='mb-2 text-xl font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-300'>
										{bar.name}
									</h5>
								</a>
								{/* Adres i Ikona Lokalizacji */}
								<div className='flex items-center space-x-2'>
									<LocationFilled className='text-gray-600 w-6 h-6' />
									<span className='text-sm text-gray-600'>{bar.address}</span>
								</div>
								{/* Oceny i Liczba opinii */}
								<div className='mb-4 flex items-center space-x-2'>
									<span className='text-sm text-gray-600'>{bar.averageRating}</span>
									<Rating name='read-only' value={bar.averageRating} readOnly />
									<span className='text-sm text-gray-600'>({bar.numberOfReviews})</span>
								</div>
								<div className='flex justify-between items-center'>
									{/* Ikonki */}
									<div className='flex items-center space-x-2'>
										{bar.icon_types?.map(icon => (
											<span
												key={icon}
												className='inline-flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full text-gray-700 text-xs'>
												{icon}
											</span>
										))}
									</div>
									<Link
										to={`/bar/${bar.id}`}
										className='inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>
										Szczegóły
										<svg
											className='w-4 h-4 ml-2'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'>
											<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 12h14m-7-7l7 7-7 7' />
										</svg>
									</Link>
								</div>
							</div>
						</div>
					</Grid2>
				))}
			</Grid2>
		</div>
	)
}

export default BarsList
