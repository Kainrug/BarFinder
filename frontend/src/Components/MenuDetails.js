import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../Api/axios'
import { Rating } from '@mui/material'
import { useAuth } from '../Context/AuthContext'

const MenuDetails = () => {
	const { id } = useParams()
	const { isLoggedIn, userId } = useAuth()
	const [menuItem, setMenuItem] = useState(null)
	const [reviews, setReviews] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [userRating, setUserRating] = useState(0)
	const [comment, setComment] = useState('')
	const [successMessage, setSuccessMessage] = useState('')

	useEffect(() => {
		const fetchMenuItem = async () => {
			try {
				const response = await axiosInstance.get(`/menu/${id}`)
				setMenuItem(response.data)
			} catch (error) {
				console.error('Błąd podczas pobierania szczegółów pozycji menu:', error)
			}
		}

		const fetchReviews = async () => {
			try {
				const response = await axiosInstance.get(`/menus/${id}/reviews`)
				setReviews(response.data)
			} catch (error) {
				console.error('Błąd podczas pobierania opinii:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchMenuItem()
		fetchReviews()
	}, [id])

	const handleSubmitReview = async () => {
		if (!isLoggedIn) {
			alert('Musisz być zalogowany, aby dodać opinię!')
			return
		}

		try {
			const reviewData = { rating: userRating, comment, userId }
			await axiosInstance.post(`/menus/${id}/reviews`, reviewData)
			setSuccessMessage('Opinia została zapisana!')
			setTimeout(() => {
				setSuccessMessage('')
			}, 5000)
			setComment('')
			setUserRating(0)
		} catch (error) {
			console.error('Błąd podczas dodawania opinii:', error)
		}
	}

	const handleDeleteReview = async reviewId => {
		try {
			const response = await axiosInstance.delete(`/menu-reviews/${reviewId}`)
			if (response.status === 200) {
				setReviews(reviews.filter(review => review.id !== reviewId))
				setSuccessMessage('Opinia została usunięta!')
				setTimeout(() => {
					setSuccessMessage('')
				}, 5000)
			} else {
				throw new Error('Błąd usuwania opinii')
			}
		} catch (error) {
			console.error('Błąd podczas usuwania opinii:', error)
			setSuccessMessage('Wystąpił problem z usunięciem opinii')
		}
	}

	if (isLoading) {
		return <p>Ładowanie...</p>
	}

	return (
		<div className='min-h-screen bg-gray-100'>
			<div className='container mx-auto px-4 py-8'>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-3xl font-bold'>{menuItem.name}</h2>
					<p className='text-lg font-semibold'>{menuItem.price} zł</p>
				</div>
				<div className='flex flex-col md:flex-row'>
					<img
						src={menuItem.image_url || 'https://via.placeholder.com/150'}
						alt={menuItem.name}
						className='w-full md:w-1/3 rounded-lg shadow-md mb-4 md:mb-0'
					/>
					<div className='md:w-2/3 px-4'>
						<p className='text-gray-700'>{menuItem.description}</p>
						<div className='flex items-center my-4'>
							<Rating name='read-only' value={menuItem.averageRating || 0} readOnly className='text-yellow-500' />
							<span className='ml-2 text-sm text-gray-600'>({menuItem.numberOfReviews} opinii)</span>
						</div>
					</div>
				</div>

				<div className='my-6'>
					<h3 className='text-xl font-semibold mb-2'>Opinie</h3>
					{reviews.length > 0 ? (
						reviews.map(review => (
							<div key={review.id} className='border-b pb-4 mb-4'>
								<p className='font-semibold'>{review.User?.username || 'Anonimowy użytkownik'}</p>
								<Rating name='read-only' value={review.rating} readOnly className='text-yellow-500' />
								<p className='text-sm text-gray-600'>{new Date(review.createdAt).toLocaleDateString('pl-PL')}</p>
								<p className='mt-2 text-gray-700'>{review.comment}</p>
								{isLoggedIn && review.User_ID === userId && (
									<button onClick={() => handleDeleteReview(review.id)} className='text-red-500 mt-2'>
										Usuń opinię
									</button>
								)}
							</div>
						))
					) : (
						<p>Brak opinii na temat tej pozycji menu.</p>
					)}
				</div>

				{isLoggedIn && (
					<div className='flex justify-center mt-6'>
						<textarea
							className='w-full p-2 border rounded mb-4'
							placeholder='Napisz swoją opinię...'
							value={comment}
							onChange={e => setComment(e.target.value)}
						/>
						<div className='flex gap-4'>
							<Rating name='user-rating' value={userRating} onChange={(e, newValue) => setUserRating(newValue)} />
							<button
								onClick={handleSubmitReview}
								className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
								Dodaj opinię
							</button>
						</div>
					</div>
				)}

				{successMessage && <div className='mt-4 bg-green-500 text-white p-4 rounded-md'>{successMessage}</div>}
			</div>
		</div>
	)
}

export default MenuDetails
