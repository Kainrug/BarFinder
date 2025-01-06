import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../Api/axios'
import { useAuth } from '../Context/AuthContext'
import { useTranslation } from 'react-i18next'

const MatchDetails = () => {
	const { id } = useParams()
	const { role } = useAuth()
	const [match, setMatch] = useState(null)
	const [loading, setLoading] = useState(true)
	const [usersToCome, setUsersToCome] = useState({})
	const [message, setMessage] = useState({ text: '', type: '' })
	const { t } = useTranslation()

	const handleInputChange = (barId, value) => {
		setUsersToCome(prevState => ({ ...prevState, [barId]: value }))
	}

	const handleSubscription = async barId => {
		const numberOfUsers = usersToCome[barId] || 1
		try {
			await axiosInstance.post('/subscriptions', {
				Bar_ID: barId,
				Match_ID: id,
				users_to_come: numberOfUsers,
			})
			setMessage({ text: t('subscriptionSuccess', { numberOfUsers }), type: 'success' })
		} catch (error) {
			const errorMessage = error.response?.data?.message || t('subscriptionError')
			setMessage({ text: errorMessage, type: 'error' })
		}
	}

	useEffect(() => {
		const fetchMatchDetails = async () => {
			try {
				const response = await axiosInstance.get(`/match/${id}`)
				setMatch(response.data)
				setLoading(false)
			} catch (error) {
				console.error(t('errorFetchingMatchDetails'), error)
				setLoading(false)
			}
		}
		fetchMatchDetails()
	}, [id])

	if (loading) {
		return <p className='text-center text-gray-500 mt-8'>{t('loading')}</p>
	}

	if (!match) {
		return <p className='text-center text-gray-500 mt-8'>{t('matchNotFound')}</p>
	}

	return (
		<div className='bg-gray-100 min-h-screen p-8'>
			<h1 className='text-3xl font-bold text-center mb-4'>
				{match.team_1} {t('vs')} {match.team_2}
			</h1>
			<p className='text-center text-gray-700 mb-8'>
				{t('matchDate')}: {new Date(match.match_date).toLocaleString()}
			</p>
			{message.text && (
				<p className={`text-center mb-4 ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
					{message.text}
				</p>
			)}
			<h2 className='text-2xl font-semibold text-gray-800 mb-4'>{t('barsBroadcastingMatch')}:</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{match.Bars && match.Bars.length > 0 ? (
					match.Bars.map(bar => (
						<div
							key={bar.id}
							className='bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200'>
							<h3 className='text-lg font-semibold text-gray-800 mb-2'>{bar.name}</h3>
							<p className='text-gray-600'>{bar.address}</p>
							{role === 'Użytkownik' && (
								<>
									<label htmlFor={`usersToCome-${bar.id}`} className='block mb-2'>
										{t('numberOfPeople')}:
									</label>
									<input
										type='number'
										id={`usersToCome-${bar.id}`}
										min='1'
										value={usersToCome[bar.id] || 1}
										onChange={e => handleInputChange(bar.id, parseInt(e.target.value, 10))}
										className='border rounded w-full px-3 py-2 mb-2'
									/>
									<button
										onClick={() => handleSubscription(bar.id)}
										className='bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600 transition'>
										{t('subscribeToMatch')}
									</button>
								</>
							)}
						</div>
					))
				) : (
					<p className='text-gray-600 text-center col-span-full'>{t('noBarsBroadcasting')}</p>
				)}
			</div>
		</div>
	)
}

export default MatchDetails
