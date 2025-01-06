import React, { useEffect, useState } from 'react'
import axiosInstance from '../Api/axios'
import { useTranslation } from 'react-i18next'

const SubscriptionsPage = () => {
	const [subscriptions, setSubscriptions] = useState([])
	const { t } = useTranslation()

	useEffect(() => {
		const fetchSubscriptions = async () => {
			try {
				const response = await axiosInstance.get('/subscriptions')
				setSubscriptions(response.data)
			} catch (error) {
				console.error('Błąd pobierania subskrypcji:', error)
			}
		}
		fetchSubscriptions()
	}, [])

	const formatDate = date => {
		const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
		return new Date(date).toLocaleDateString('pl-PL', options)
	}

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4'>{t('yourSubscriptions')}</h1>
			<div className='space-y-4'>
				{subscriptions.length === 0 ? (
					<p>{t('noSignings')}</p>
				) : (
					subscriptions.map(sub => (
						<div key={sub.id} className='border p-4 rounded-lg shadow-lg'>
							<h2 className='text-xl font-semibold'>{sub.Bar?.name || 'Nieznany bar'}</h2>
							<p className='text-lg text-gray-700'>
								<strong>{t('match')}: </strong>
								{sub.Match?.team_1} vs {sub.Match?.team_2 || 'Nieznane drużyny'}
							</p>
							<p className='text-gray-600'>
								<strong>{t('matchDate')}: </strong>
								{sub.Match?.match_date ? formatDate(sub.Match.match_date) : 'Nieznana data'}
							</p>
							<p className='text-gray-600'>
								<strong>{t('numberOfPeople')}: </strong>
								{sub.users_to_come}
							</p>
							<p className='text-gray-600'>
								<strong>{t('user')}: </strong>
								{sub.User?.username || 'Nieznany użytkownik'}
							</p>
						</div>
					))
				)}
			</div>
		</div>
	)
}

export default SubscriptionsPage
