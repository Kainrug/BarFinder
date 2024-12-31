import React, { useState, useEffect } from 'react'
import axiosInstance from '../Api/axios'
import BarsList from './BarList'

const Bars = () => {
	const [bars, setBars] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchBars = async () => {
			try {
				const response = await axiosInstance.get('/bars')
				setBars(response.data)
			} catch (error) {
				console.error('Błąd podczas pobierania barów:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchBars()
	}, [])

	if (loading) {
		return <div>Ładowanie...</div>
	}

	return (
		<div className='bars-list'>{bars.length > 0 ? <BarsList bars={bars} /> : <p>Brak barów do wyświetlenia.</p>}</div>
	)
}

export default Bars
