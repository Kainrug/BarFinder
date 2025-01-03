import React, { useState, useEffect } from 'react'
import axiosInstance from '../Api/axios'
import BarCard from './HeroBarCard'
import { IconButton, TextField } from '@mui/material'
import { Search, Close } from './Icons'

const HeroBarList = () => {
	const [bars, setBars] = useState([])
	const [searchTerm, setSearchTerm] = useState('')
	const [isSearching, setIsSearching] = useState(false)

	const handleSearch = async e => {
		e.preventDefault()

		setIsSearching(true)

		try {
			const response = await axiosInstance.post('/bars/name', { name: searchTerm })
			setBars(response.data)
		} catch (error) {
			console.error('Błąd podczas wyszukiwania barów:', error)
		} finally {
			setIsSearching(false)
		}
	}

	useEffect(() => {
		if (searchTerm === '') {
			const fetchBars = async () => {
				try {
					const response = await axiosInstance.get('/bars')
					setBars(response.data)
				} catch (error) {
					console.error('Błąd podczas pobierania barów:', error)
				}
			}

			fetchBars()
		}
	}, [searchTerm])

	return (
		<div className='space-y-4 mt-10'>
			{/* Pasek wyszukiwania */}
			<div className='flex justify-center mb-6'>
				<form onSubmit={handleSearch} className='relative max-w-4xl w-full'>
					<TextField
						label='Szukaj barów po nazwie...'
						variant='outlined'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						onKeyDown={e => {
							if (e.key === 'Enter') {
								handleSearch(e)
							}
						}}
						fullWidth
						className='rounded-lg py-2 px-4 shadow-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
						InputProps={{
							startAdornment: (
								<IconButton onClick={handleSearch} className='text-blue-500'>
									<Search />
								</IconButton>
							),
						}}
					/>
					<button
						type='submit'
						disabled={isSearching}
						className='absolute right-2 bottom-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none'>
						{isSearching ? 'Szukanie...' : 'Szukaj'}
					</button>
				</form>
			</div>

			{/* Lista barów */}
			{bars.length === 0 ? (
				<p className='text-center text-gray-500'>Brak wyników do wyświetlenia.</p>
			) : (
				bars.map(bar => <BarCard key={bar.id} bar={bar} />)
			)}
		</div>
	)
}

export default HeroBarList
