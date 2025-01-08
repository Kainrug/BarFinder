import React, { useState } from 'react'
import axiosInstance from '../Api/axios'
import { useTranslation } from 'react-i18next'

const AddBar = () => {
	const [name, setName] = useState('')
	const { t } = useTranslation()
	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [description, setDescription] = useState('')
	const [imageUrl, setImageUrl] = useState('')
	const [message, setMessage] = useState('')
	const [errors, setErrors] = useState({
		name: '',
		address: '',
		city: '',
		description: '',
		imageUrl: '',
	})

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			await axiosInstance.post('/bars', {
				name,
				address,
				city,
				description,
				image_url: imageUrl,
			})
			alert('Bar został dodany!')
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
		<div className='max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg'>
			<h1 className='text-2xl font-semibold text-center mb-6'>Dodaj bar</h1>
			<form onSubmit={handleSubmit} className='space-y-6'>
				{/* Formularz do dodania baru */}
				<div>
					<label htmlFor='name' className='block text-sm font-medium text-gray-700'>
						{t('name')}
					</label>
					<input
						type='text'
						id='name'
						placeholder='Nazwa baru'
						value={name}
						onChange={e => setName(e.target.value)}
						className='w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
					{errors.name && <div className='mb-4 text-center text-sm text-red-600'>{errors.name}</div>}
				</div>

				<div>
					<label htmlFor='address' className='block text-sm font-medium text-gray-700'>
					{t('address')}
					</label>
					<input
						type='text'
						id='address'
						placeholder='Adres baru'
						value={address}
						onChange={e => setAddress(e.target.value)}
						className='w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
					{errors.address && <div className='mb-4 text-center text-sm text-red-600'>{errors.address}</div>}
				</div>

				<div>
					<label htmlFor='city' className='block text-sm font-medium text-gray-700'>
						{t('city')}
					</label>
					<input
						type='text'
						id='city'
						placeholder='Miasto baru'
						value={city}
						onChange={e => setCity(e.target.value)}
						className='w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
					{errors.city && <div className='mb-4 text-center text-sm text-red-600'>{errors.city}</div>}
				</div>

				<div>
					<label htmlFor='description' className='block text-sm font-medium text-gray-700'>
						{t('barDescription')}
					</label>
					<textarea
						id='description'
						placeholder='Opis baru'
						value={description}
						onChange={e => setDescription(e.target.value)}
						className='w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32'
					/>
					{errors.description && <div className='mb-4 text-center text-sm text-red-600'>{errors.description}</div>}
				</div>

				<div>
					<label htmlFor='imageUrl' className='block text-sm font-medium text-gray-700'>
						{t('imageUrl')}
					</label>
					<input
						type='text'
						id='imageUrl'
						placeholder='URL zdjęcia baru'
						value={imageUrl}
						onChange={e => setImageUrl(e.target.value)}
						className='w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
					{errors.imageUrl && <div className='mb-4 text-center text-sm text-red-600'>{errors.imageUrl}</div>}
				</div>

				<button
					type='submit'
					className='w-full py-3 mt-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
					{t('addBar')}
				</button>

				{message && <div className='mb-4 text-center text-sm text-red-600'>{message}</div>}
			</form>
		</div>
	)
}

export default AddBar
