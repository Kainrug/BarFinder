import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosInstance from '../Api/axios'
import { Rating } from '@mui/material'
import { useAuth } from '../Context/AuthContext'
import { useTranslation } from 'react-i18next'

const MenuDetails = () => {
	const { t } = useTranslation() // Hook do tłumaczenia
	const { id } = useParams()
	const { isLoggedIn, userId } = useAuth()
	const [menuItem, setMenuItem] = useState(null)
	const [reviews, setReviews] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [userRating, setUserRating] = useState(0)
	const [comment, setComment] = useState('')
	const [successMessage, setSuccessMessage] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		const fetchMenuItem = async () => {
			try {
				const response = await axiosInstance.get(`/menu/${id}`)
				setMenuItem(response.data)
			} catch (error) {
				console.error(t('errorFetchingMenuItem'), error)
			}
		}

		const fetchReviews = async () => {
			try {
				const response = await axiosInstance.get(`/menus/${id}/reviews`)
				setReviews(response.data)
			} catch (error) {
				console.error(t('errorFetchingReviews'), error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchMenuItem()
		fetchReviews()
	}, [id, t])

	const handleSubmitReview = async () => {
		if (!isLoggedIn) {
			alert(t('loginRequired'))
			return
		}

		try {
			const reviewData = { rating: userRating, comment, userId }
			await axiosInstance.post(`/menus/${id}/reviews`, reviewData)
			setSuccessMessage(t('reviewSubmitted'))
			setTimeout(() => {
				setSuccessMessage('')
			}, 5000)
			setComment('')
			setUserRating(0)
		} catch (error) {
			console.error(t('errorSubmittingReview'), error)
		}
	}

	const handleDeleteReview = async reviewId => {
		try {
			const response = await axiosInstance.delete(`/menus/${id}/reviews/${reviewId}`)
			if (response.status === 200) {
				setReviews(reviews.filter(review => review.id !== reviewId))
				setSuccessMessage(t('reviewDeleted'))
				setTimeout(() => {
					setSuccessMessage('')
				}, 5000)
			} else {
				throw new Error(t('errorDeletingReview'))
			}
		} catch (error) {
			console.error(t('errorDeletingReview'), error)
			setSuccessMessage(t('problemDeletingReview'))
		}
	}

	if (isLoading) {
		return <p>{t('loading')}</p>
	}

	return (
		<div className='min-h-screen bg-gray-100'>
			<div className='container mx-auto px-4 py-8'>
				<button
					onClick={() => navigate(-1)}
					className='absolute left-10 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600 transition'>
					{t('back')}
				</button>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-3xl font-bold'>{menuItem.name}</h2>
				</div>
				<div className='flex flex-col md:flex-row'>
					<img
						src={menuItem.image_url || 'https://via.placeholder.com/150'}
						alt={menuItem.name}
						className='w-full md:w-1/3 rounded-lg shadow-md mb-4 md:mb-0'
					/>
					<div className='md:w-2/3 px-4'>
						<p className='text-lg font-semibold'>{menuItem.price} zł</p>
						<p className='text-gray-700'>{menuItem.description}</p>
						<div className='flex items-center my-4'>
							<Rating name='read-only' value={menuItem.averageRating || 0} readOnly className='text-yellow-500' />
							<span className='ml-2 text-sm text-gray-600'>
								({menuItem.numberOfReviews} {t('reviews')})
							</span>
						</div>
					</div>
				</div>

				<div className='my-6'>
					<h3 className='text-xl font-semibold mb-2'>{t('reviews')}</h3>
					{reviews.length > 0 ? (
						reviews.map(review => (
							<div key={review.id} className='border-b pb-4 mb-4'>
								<p className='font-semibold'>{review.User?.username || t('anonymousUser')}</p>
								<Rating name='read-only' value={review.rating} readOnly className='text-yellow-500' />
								<p className='text-sm text-gray-600'>{new Date(review.createdAt).toLocaleDateString()}</p>
								<p className='mt-2 text-gray-700'>{review.comment}</p>
								{isLoggedIn && review.User_ID === userId && (
									<button onClick={() => handleDeleteReview(review.id)} className='text-red-500 mt-2'>
										{t('deleteReview')}
									</button>
								)}
							</div>
						))
					) : (
						<p>{t('noReviewsYet')}</p>
					)}
				</div>

				{isLoggedIn && (
					<div className='flex justify-center mt-6'>
						<textarea
							className='w-full p-2 border rounded mb-4'
							placeholder={t('addYourReview')}
							value={comment}
							onChange={e => setComment(e.target.value)}
						/>
						<div className='flex gap-4'>
							<Rating name='user-rating' value={userRating} onChange={(e, newValue) => setUserRating(newValue)} />
							<button
								onClick={handleSubmitReview}
								className='bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-600'>
								{t('submitReview')}
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
