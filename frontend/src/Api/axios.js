import axios from 'axios'
const axiosInstance = axios.create({
	baseURL: 'http://localhost:5000/api',
	headers: {
		'Content-Type': 'application/json',
	},
})

const refreshToken = async () => {
	const refreshToken = localStorage.getItem('refreshToken')
	if (!refreshToken) {
		throw new Error('Brak refresh tokena')
	}

	try {
		const response = await axios.post('http://localhost:5000/api/refresh-token', { token: refreshToken })
		const newAccessToken = response.data.accessToken

		
		localStorage.setItem('accessToken', newAccessToken)
		return newAccessToken
	} catch (error) {
		console.error('Błąd odświeżania tokena:', error)
		throw error
	}
}


axiosInstance.interceptors.request.use(
	config => {
		const accessToken = localStorage.getItem('accessToken')
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)


axiosInstance.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			try {
				const newAccessToken = await refreshToken()
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
				return axiosInstance(originalRequest)
			} catch (refreshError) {
				localStorage.removeItem('accessToken')
				localStorage.removeItem('refreshToken')
				window.location.href = '/login'
				return Promise.reject(refreshError)
			}
		}

		return Promise.reject(error)
	}
)

export default axiosInstance
