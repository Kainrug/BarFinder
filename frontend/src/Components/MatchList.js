import React, { useState, useEffect } from 'react'
import axiosInstance from '../Api/axios'
import { Link } from 'react-router-dom'
import { Add } from '@mui/icons-material'
import { useAuth } from '../Context/AuthContext'

const MatchesList = () => {
	const [matches, setMatches] = useState([])
	const [showForm, setShowForm] = useState(false)
	const { role } = useAuth()
	const [formData, setFormData] = useState({
		sport: '',
		team_1: '',
		team_2: '',
		match_date: '',
	})
	const [errors, setErrors] = useState({
		sport: '',
		team_1: '',
		team_2: '',
		match_date: '',
	})
	const [message, setMessage] = useState('')

	useEffect(() => {
		const fetchMatches = async () => {
			try {
				const response = await axiosInstance.get('/match')
				setMatches(response.data)
			} catch (error) {
				console.error('Błąd podczas pobierania meczów:', error)
			}
		}

		fetchMatches()
	}, [])

	const handleInputChange = e => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleDeleteMatch = async matchId => {
		try {
			await axiosInstance.delete(`/match/${matchId}`)
			setMatches(matches.filter(match => match.id !== matchId))
			setMessage('Mecz został usunięty!')
		} catch (error) {
			setMessage('Wystąpił błąd podczas usuwania meczu.')
			console.error(error)
		}
	}

	const handleFormSubmit = async e => {
		e.preventDefault()

		const newErrors = {}

		if (!formData.sport) newErrors.sport = 'Dyscyplina sportowa jest wymagana.'
		if (!formData.team_1) newErrors.team_1 = 'Pierwsza drużyna jest wymagana.'
		if (!formData.team_2) newErrors.team_2 = 'Druga drużyna jest wymagana.'
		if (!formData.match_date) newErrors.match_date = 'Data meczu jest wymagana.'
		else if (new Date(formData.match_date) <= new Date()) newErrors.match_date = 'Data meczu musi być w przyszłości.'

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			setMessage('Popraw błędy w formularzu.')
			return
		}

		try {
			const response = await axiosInstance.post('/match', formData)
			setMatches([...matches, response.data.match])
			setFormData({ sport: '', team_1: '', team_2: '', match_date: '' })
			setShowForm(false)
			setMessage('Mecz został dodany!')
		} catch (error) {
			if (error.response?.data?.errors) {
				const newErrors = {}
				error.response.data.errors.forEach(err => {
					newErrors[err.path] = err.msg
				})
				setErrors(newErrors)
				setMessage('Popraw błędy w formularzu.')
			} else {
				setMessage(error.response?.data?.message || 'Wystąpił błąd')
			}
		}
	}

	return (
		<div className='bg-gray-100 min-h-screen p-8'>
			<h1 className='text-3xl font-bold text-center mb-8'>Lista Meczów</h1>
			<button onClick={() => setShowForm(!showForm)} className='bg-gray-800 text-white px-4 py-2 mb-4 rounded'>
				{showForm ? 'Zamknij formularz' : 'Dodaj Mecz'}
			</button>

			{showForm && (
				<form onSubmit={handleFormSubmit} className='mb-8 bg-white p-6 rounded shadow'>
					<div>
						<label className='block mb-2 font-bold'>Sport:</label>
						<input
							type='text'
							name='sport'
							value={formData.sport}
							onChange={handleInputChange}
							className='w-full p-2 border rounded'
						/>
						{errors.sport && <div className='mb-4 text-center text-sm text-red-600'>{errors.sport}</div>}
					</div>
					<div>
						<label className='block mb-2 font-bold'>Drużyna 1:</label>
						<input
							type='text'
							name='team_1'
							value={formData.team_1}
							onChange={handleInputChange}
							className='w-full p-2 border rounded'
						/>
						{errors.team_1 && <div className='mb-4 text-center text-sm text-red-600'>{errors.team_1}</div>}
					</div>
					<div>
						<label className='block mb-2 font-bold'>Drużyna 2:</label>
						<input
							type='text'
							name='team_2'
							value={formData.team_2}
							onChange={handleInputChange}
							className='w-full p-2 border rounded'
						/>
						{errors.team_2 && <div className='mb-4 text-center text-sm text-red-600'>{errors.team_2}</div>}
					</div>
					<div>
						<label className='block mb-2 font-bold'>Data meczu:</label>
						<input
							type='datetime-local'
							name='match_date'
							value={formData.match_date}
							onChange={handleInputChange}
							className='w-full p-2 border rounded'
						/>
						{errors.match_date && <div className='mb-4 text-center text-sm text-red-600'>{errors.match_date}</div>}
					</div>
					<button type='submit' className='mt-4 bg-green-500 text-white px-4 py-2 rounded'>
						<Add className='mr-2' />
						Dodaj Mecz
					</button>
				</form>
			)}

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{matches.map(match =>
					match && match.team_1 && match.team_2 ? (
						<div
							key={match.id}
							className='bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200'>
							<h2 className='text-lg font-semibold text-gray-800 mb-4'>
								{match.team_1} vs {match.team_2}
							</h2>
							<h3 className='text-md font-semibold text-gray-800 mb-4'>Sport: {match.sport}</h3>
							<p className='text-gray-600 mb-4'>Data: {new Date(match.match_date).toLocaleString()}</p>
							<Link
								to={`/match/${match.id}`}
								className='block text-center bg-gray-800 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200'>
								Zobacz szczegóły
							</Link>
							{role === 'Admin' && (
								<button
									onClick={() => handleDeleteMatch(match.id)}
									className='mt-4 bg-red-500 text-white px-4 py-2 rounded'>
									Usuń mecz
								</button>
							)}
						</div>
					) : null
				)}
			</div>

			{/* Ogólny komunikat o błędach */}
			{message && <div className='mb-4 text-center text-sm text-red-600'>{message}</div>}
		</div>
	)
}

export default MatchesList
