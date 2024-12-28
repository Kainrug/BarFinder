import React, { useEffect, useState } from 'react'
import axiosInstance from '../Api/axios'

const BarList = () => {
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
		<div>
			<h1>Lista barów</h1>
			<ul>
				{bars.map(bar => (
					<li key={bar.id}>
						<h2>{bar.name}</h2>
						<p>{bar.address}</p>
						<p>{bar.city}</p>
					</li>
				))}
			</ul>
		</div>
	)
}

export default BarList
