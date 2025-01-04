import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosInstance from '../Api/axios'

const BarMenu = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [menuItems, setMenuItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axiosInstance.get(`/bars/${id}/menu`)
        setMenuItems(response.data)
      } catch (error) {
        console.error('Błąd podczas pobierania menu:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMenu()
  }, [id])

  if (isLoading) {
    return <p className="text-center text-gray-700">Ładowanie menu...</p>
  }

  return (
    <div
      className="min-h-screen bg-fixed pt-10"
      style={{
        backgroundImage:
          'url(https://img.freepik.com/free-photo/raw-garganelli-pasta-with-halved-tomatoes-basil-corner-black-textured-backdrop_23-2148090992.jpg)',
      }}
    >
      <div className="max-w-5xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Powrót
        </button>
        <h1 className="text-4xl font-extrabold text-center mb-8">Menu Baru</h1>
        {menuItems.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  className="w-full h-48 object-scale-down"
                  src={item.image_url || 'https://via.placeholder.com/150'}
                  alt={item.name}
                />
                <div className="p-4">
                  <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <p className="text-lg font-semibold text-black">{item.price} zł</p>
                  <button
                    onClick={() => navigate(`/menu/${item.id}`)}
                    className="mt-4 inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Szczegóły
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Brak dostępnych pozycji w menu.</p>
        )}
      </div>
    </div>
  )
}

export default BarMenu
