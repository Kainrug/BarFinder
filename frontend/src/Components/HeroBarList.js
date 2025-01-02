// HeroBarList.js
import React, { useState, useEffect } from 'react'
import axiosInstance from '../Api/axios'
import BarCard from './HeroBarCard'

const HeroBarList = () => {
	const [bars, setBars] = useState([])

	useEffect(() => {
		const fetchBars = async () => {
			try {
				const response = await axiosInstance.get('/bars')
				setBars(response.data)
			} catch (error) {
				console.error('Error fetching bars:', error)
			}
		}

		fetchBars()
	}, [])

	return (
		<div className='space-y-4 mt-10'>
			{bars.map(bar => (
				<BarCard key={bar.id} bar={bar} />
			))}
		</div>
	)
}

export default HeroBarList
