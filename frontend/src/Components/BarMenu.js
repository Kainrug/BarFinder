import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosInstance from '../Api/axios'
import { Add } from '@mui/icons-material'
import { useAuth } from '../Context/AuthContext'

const BarMenu = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const { userId } = useAuth()
	const [menuItems, setMenuItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [showModal, setShowModal] = useState(false)
	const [newItem, setNewItem] = useState({ name: '', description: '', price: '', image_url: '' })
	const [isOwner, setIsOwner] = useState(false)

	useEffect(() => {
		const fetchMenuAndCheckOwner = async () => {
			try {
				const menuResponse = await axiosInstance.get(`/bars/${id}/menu`)
				setMenuItems(menuResponse.data)

				const barResponse = await axiosInstance.get(`/bars/${id}`)
				if (barResponse.data.owner_id === userId) {
					setIsOwner(true)
				}
			} catch (error) {
				console.error('Błąd podczas pobierania danych:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchMenuAndCheckOwner()
	}, [id, userId])

	const handleAddItem = async () => {
		try {
			const response = await axiosInstance.post(`/bars/${id}/menu`, newItem)
			setMenuItems([...menuItems, response.data])
			setShowModal(false)
			setNewItem({ name: '', description: '', price: '', image_url: '' })
		} catch (error) {
			console.error('Błąd podczas dodawania pozycji:', error)
		}
	}

	if (isLoading) {
		return <p className='text-center text-gray-700'>Ładowanie menu...</p>
	}

	return (
		<div
			className='min-h-screen bg-fixed pt-10'
			style={{
				backgroundImage:
					'url(https://img.freepik.com/free-photo/raw-garganelli-pasta-with-halved-tomatoes-basil-corner-black-textured-backdrop_23-2148090992.jpg)',
			}}>
			<div className='max-w-5xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg relative'>
				<button
					onClick={() => navigate(-1)}
					className='absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600 transition'>
					Powrót
				</button>
				{isOwner && (
					<button
						onClick={() => setShowModal(true)}
						className='absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600 transition flex items-center'>
						<Add className='mr-2' />
						Dodaj pozycję
					</button>
				)}
				<h1 className='text-4xl font-extrabold text-center mb-8'>Menu Baru</h1>
				{menuItems.length > 0 ? (
					<div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
						{menuItems.map(item => (
							<div key={item.id} className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition'>
								<img
									className='w-full h-48 object-scale-down'
									src={item.image_url || 'https://via.placeholder.com/150'}
									alt={item.name}
								/>
								<div className='p-4'>
									<h2 className='text-2xl font-bold mb-2'>{item.name}</h2>
									<p className='text-gray-600 mb-4'>{item.description}</p>
									<p className='text-lg font-semibold text-black'>{item.price} zł</p>
									<button
										onClick={() => navigate(`/menu/${item.id}`)}
										className='mt-4 inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2'>
										Szczegóły
									</button>
									<button
										onClick={async () => {
											try {
												await axiosInstance.delete(`/bars/${id}/menu/${item.id}`)
												setMenuItems(menuItems.filter(menuItem => menuItem.id !== item.id))
											} catch (error) {
												console.error('Błąd podczas usuwania pozycji:', error)
											}
										}}
										className='mt-2 text-red-600 hover:text-red-800'>
										Usuń
									</button>
								</div>
							</div>
						))}
					</div>
				) : (
					<p className='text-center text-gray-500'>Brak dostępnych pozycji w menu.</p>
				)}

				{showModal && (
					<div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
						<div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
							<h2 className='text-2xl font-bold mb-4'>Dodaj nową pozycję</h2>
							<label className='block mb-2'>
								<span className='text-gray-700'>Nazwa</span>
								<input
									type='text'
									className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300'
									value={newItem.name}
									onChange={e => setNewItem({ ...newItem, name: e.target.value })}
								/>
							</label>
							<label className='block mb-2'>
								<span className='text-gray-700'>Opis</span>
								<textarea
									className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300'
									value={newItem.description}
									onChange={e => setNewItem({ ...newItem, description: e.target.value })}></textarea>
							</label>
							<label className='block mb-2'>
								<span className='text-gray-700'>Cena</span>
								<input
									type='number'
									step='0.01'
									className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300'
									value={newItem.price}
									onChange={e => setNewItem({ ...newItem, price: e.target.value })}
								/>
							</label>
							<label className='block mb-4'>
								<span className='text-gray-700'>URL Obrazu</span>
								<input
									type='text'
									className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300'
									value={newItem.image_url}
									onChange={e => setNewItem({ ...newItem, image_url: e.target.value })}
								/>
							</label>
							<div className='flex justify-end space-x-4'>
								<button
									onClick={() => setShowModal(false)}
									className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition'>
									Anuluj
								</button>
								<button
									onClick={handleAddItem}
									className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'>
									Dodaj
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default BarMenu
