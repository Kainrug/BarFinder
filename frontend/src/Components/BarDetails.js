import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../Api/axios'
import { Rating } from '@mui/material'
import { LocationFilled } from './Icons'
import { useAuth } from '../Context/AuthContext'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const BarDetails = () => {
	const { id } = useParams()
	const { t } = useTranslation()
	const { isLoggedIn, userId } = useAuth()
	const [bar, setBar] = useState(null)
	const [reviews, setReviews] = useState([])
	const [isLoadingReviews, setIsLoadingReviews] = useState(true)
	const [userRating, setUserRating] = useState(0)
	const [isReviewFormVisible, setIsReviewFormVisible] = useState(false)
	const [comment, setComment] = useState('')
	const [successMessage, setSuccessMessage] = useState('')
	const [isEditingReview, setIsEditingReview] = useState(false)
	const [reviewId, setReviewId] = useState(null)
	const [activeTab, setActiveTab] = useState('details')
	const [matches, setMatches] = useState([])
	const [isMatchFormVisible, setIsMatchFormVisible] = useState(false)
	const [selectedMatch, setSelectedMatch] = useState(null)
	const [isOwner, setIsOwner] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchBarDetails = async () => {
			try {
				const response = await axiosInstance.get(`/bars/${id}`)
				setBar(response.data)

				if (response.data.owner_id === userId) {
					setIsOwner(true)
				}
			} catch (error) {
				console.error('Error fetching bar details:', error)
			}
		}

		const fetchReviews = async () => {
			try {
				const response = await axiosInstance.get(`/bars/${id}/reviews`)
				setReviews(response.data)
			} catch (error) {
				console.error('Error fetching reviews:', error)
			} finally {
				setIsLoadingReviews(false)
			}
		}
		const fetchMatches = async () => {
			try {
				const response = await axiosInstance.get(`/match`)
				console.log(response.data)
				setMatches(response.data)
			} catch (error) {
				console.error('Error fetching matches:', error)
			}
		}

		fetchBarDetails()
		fetchReviews()
		fetchMatches()
	}, [id])

	const handleRatingChange = (event, newValue) => {
		setUserRating(newValue)
	}

	const handleSelectMatch = e => {
		const selectedId = Number(e.target.value)
		const selected = matches.find(match => match.id === selectedId)
		setSelectedMatch(selected)
	}

	const handleEditReview = reviewId => {
		const reviewToEdit = reviews.find(review => review.id === reviewId)
		setComment(reviewToEdit.comment)
		setUserRating(reviewToEdit.rating)
		setIsEditingReview(true)
		setIsReviewFormVisible(true)
		setReviewId(reviewId)
	}

	const handleAssignMatch = async () => {
		if (!selectedMatch) {
			alert(t('pleaseSelectMatch'))
			return
		}

		try {
			const response = await axiosInstance.post(`/bars/${id}/assign-match`, {
				Bar_ID: id,
				Match_ID: selectedMatch.id,
			})
			alert(t('matchAssigned'))
			setIsMatchFormVisible(false)
		} catch (error) {
			alert(t('matchAssignError'))
			console.error(error)
		}
	}

	const handleDeleteReview = async reviewId => {
		try {
			await axiosInstance.delete(`/reviews/${reviewId}`)
			setReviews(reviews.filter(review => review.id !== reviewId))
			alert(t('reviewDeleted'))
		} catch (error) {
			console.error('Błąd podczas usuwania opinii:', error)
			alert(t('reviewDeleteError'))
		}
	}

	const submitReview = async () => {
		try {
			const reviewData = { rating: userRating, comment, userId }
			if (isEditingReview) {
				await axiosInstance.patch(`/reviews/${reviewId}`, reviewData)
			} else {
				await axiosInstance.post(`/bars/${id}/reviews`, reviewData)
			}
			setSuccessMessage(t('reviewSubmitted'))
			setTimeout(() => {
				setSuccessMessage('')
			}, 5000)
			setIsReviewFormVisible(false)
			setComment('')
			setUserRating(0)
			setIsEditingReview(false)
		} catch (error) {
			console.error('Błąd podczas dodawania opinii:', error)
			alert(t('reviewAddError'))
		}
	}

	const handleCloseForm = () => {
		window.location.reload()
	}

	const changeImage = src => {
		document.getElementById('mainImage').src = src
	}

	const handleTabChange = tab => {
		setActiveTab(tab)
	}

	if (!bar) {
		return <p>{t('loading')}...</p>
	}

	return (
		<div className='min-h-screen bg-gray-100'>
			<div className='container mx-auto px-4 py-8'>
				<div className='flex gap-4 pb-3'>
					<button
						className={`px-4 py-2 rounded-full ${activeTab === 'details' ? 'bg-gray-800 text-white' : 'bg-gray-300'}`}
						onClick={() => handleTabChange('details')}>
						{t('detailsBar')}
					</button>
					<button
						className={`px-4 py-2 rounded-full ${activeTab === 'matches' ? 'bg-gray-800 text-white' : 'bg-gray-300'}`}
						onClick={() => handleTabChange('matches')}>
						{t('matchTransmision')}
					</button>
				</div>

				<div className='mb-6'>
					<nav className='text-sm'>
						<Link to='/' className='text-blue-500 hover:underline'>
							{t('home')}
						</Link>
						<span className='mx-2 text-gray-500'>&gt;</span>
						<Link to='/bars' className='text-blue-500 hover:underline'>
							{t('bars')}
						</Link>
						<span className='mx-2 text-gray-500'>&gt;</span>
						<span className='text-gray-700'>{bar.name}</span>
					</nav>
				</div>

				{/* Widok Szczegółów Baru */}
				{activeTab === 'details' && (
					<div className='flex flex-wrap -mx-4'>
						{/* Produkt Images */}
						<div className='w-full md:w-1/2 px-4 mb-8'>
							<img
								src={bar.image_url || 'https://via.placeholder.com/300'}
								alt={bar.name}
								className='w-full h-auto rounded-lg shadow-md mb-4'
								id='mainImage'
							/>
							<div className='flex gap-4 py-4 justify-center overflow-x-auto'>
								{bar.images?.map((image, index) => (
									<img
										key={index}
										src={image}
										alt={`Thumbnail ${index + 1}`}
										className='w-16 sm:w-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300'
										onClick={() => changeImage(image)}
									/>
								))}
							</div>
						</div>

						{/* Produkt Details */}
						<div className='w-full md:w-1/2 px-4'>
							<h2 className='text-3xl font-bold mb-2'>{bar.name}</h2>
							<p className='text-gray-600 mb-4'>{bar.sku}</p>
							<div className='flex items-center mb-4'>
								<span className='text-sm text-gray-600'>
									{bar.averageRating ? Number(bar.averageRating).toFixed(2) : 'Brak oceny'}
								</span>
								{/* Ocena read-only (gwiazdki tylko do odczytu) */}
								<Rating
									name='simple-controlled'
									value={bar.averageRating ? Math.round(Number(bar.averageRating) * 2) / 2 : 0}
									readOnly
									className='text-yellow-500'
								/>
								<span className='text-sm text-gray-600'>({bar.numberOfReviews})</span>
							</div>
							<div className='mb-6'>
								<h3 className='text-xl font-semibold mb-2'>{t('barDescription')}</h3>
								<p className='text-gray-700 leading-relaxed'>{bar.description}</p>
							</div>

							<div className='flex items-center mb-4'>
								<LocationFilled className='mr-2' />
								<p className='text-gray-700'>{bar.address}</p>
							</div>

							{/* Miasto baru */}
							<div className='flex items-center mb-4'>
								<span className='text-gray-700 font-semibold'>{t('city')}: </span>
								<p className='ml-2 text-gray-700'>{bar.city}</p>
							</div>
							<div className='flex items-center mb-4'>
								<button
									className='px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700'
									onClick={() => navigate(`/bars/${id}/menu`)}>
									{t('viewMenu')}
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Widok Repertuaru Meczów */}
				{activeTab === 'matches' && bar.Matches && bar.Matches.length > 0 && (
					<div className='mt-8'>
						<h3 className='text-2xl font-semibold mb-4'>{t('matchSchedule')}</h3>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
							{bar.Matches.map(match => (
								<div
									key={match.id}
									className='bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300'>
									<div className='flex justify-between items-center'>
										<span className='font-bold text-xl'>{match.sport}</span>
										<span className='text-sm text-gray-500'>{new Date(match.match_date).toLocaleString('pl-PL')}</span>
									</div>
									<div className='mt-4 text-lg font-semibold text-gray-700'>
										{match.team_1} vs {match.team_2}
									</div>
								</div>
							))}
						</div>

						{isOwner && (
							<div className='flex justify-center mt-6'>
								<button
									className='inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
									onClick={() => setIsMatchFormVisible(true)}>
									<Add className='mr-2' />
									{t('addMatch')}
								</button>
							</div>
						)}
					</div>
				)}
				{/* Formularz przypisania meczu */}
				{isMatchFormVisible && (
					<div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50'>
						<div className='bg-white p-6 rounded-lg shadow-lg w-96'>
							<h3 className='text-xl font-bold mb-4'>{t('matchAssign')}</h3>
							<div>
								<h4 className='mb-2'>{t('chooseMatch')}:</h4>
								<select
									value={selectedMatch ? selectedMatch.id : ''}
									onChange={handleSelectMatch}
									className='w-full p-2 border rounded mb-4'>
									<option value=''>{t('chooseMatch')}</option>
									{matches.map(match => (
										<option key={match.id} value={match.id}>
											{match.team_1} vs {match.team_2}
										</option>
									))}
								</select>
							</div>
							<div className='flex justify-end gap-4'>
								<button
									className='bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400'
									onClick={() => setIsMatchFormVisible(false)}>
									{t('cancel')}
								</button>
								<button
									className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
									onClick={handleAssignMatch}>
									{t('matchAssign')}
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Sekcja opinii */}
				{activeTab === 'details' &&
					reviews.map(review => (
						<div key={review.id} className='p-4 border-b border-gray-200'>
							<div className='flex items-center justify-between'>
								<p className='font-semibold'>{review.User?.username || 'Anonimowy użytkownik'}</p>
								<Rating name='read-only' value={review.rating} readOnly className='text-yellow-500' />
							</div>
							<p className='text-sm text-gray-500'>{new Date(review.createdAt).toLocaleDateString('pl-PL')}</p>
							<p className='mt-2 text-gray-700'>{review.comment}</p>
							{isLoggedIn && review.User_ID === userId && (
								<div className='flex gap-4 mt-2'>
									<button onClick={() => handleEditReview(review.id)} className='text-blue-500 hover:underline'>
										{t('edit')}
									</button>
									<button onClick={() => handleDeleteReview(review.id)} className='text-red-500 hover:underline'>
										{t('delete')}
									</button>
								</div>
							)}
						</div>
					))}

				{activeTab === 'details' && isLoggedIn && (
					<div className='flex justify-center mt-6'>
						<button
							className='inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
							onClick={() => setIsReviewFormVisible(true)}>
							<Add className='mr-2' />
							{t('addReview')}
						</button>
					</div>
				)}

				{/* Komunikat o sukcesie */}
				{successMessage && <div className='mt-4 bg-green-500 text-white p-4 rounded-md'>{successMessage}</div>}

				{/* Formularz opinii */}
				{activeTab === 'details' && isReviewFormVisible && !successMessage && (
					<div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50'>
						<div className='bg-white p-6 rounded-lg shadow-lg w-96'>
							<h3 className='text-xl font-bold mb-4'>{t('addReview')}</h3>
							<p className='mb-2'>
								{t('yourReview')}: {userRating} {t('stars')}
							</p>
							<Rating name='user-rating' value={userRating} onChange={handleRatingChange} className='mb-4' />
							<textarea
								className='w-full p-2 border rounded mb-4'
								placeholder={t('addYourReview')}
								value={comment}
								onChange={e => setComment(e.target.value)}
							/>
							<div className='flex justify-end gap-4'>
								<button
									className='bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400'
									onClick={() => setIsReviewFormVisible(false)}>
									{t('cancel')}
								</button>
								<button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' onClick={submitReview}>
									{t('addReview')}
								</button>
							</div>
						</div>
					</div>
				)}
				{/* Komunikat po dodaniu opinii */}
				{successMessage && (
					<div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50'>
						<div className='bg-white p-6 rounded-lg shadow-lg w-96'>
							<h3 className='text-xl font-bold mb-4'>{successMessage}</h3>
							<button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' onClick={handleCloseForm}>
								OK
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default BarDetails
