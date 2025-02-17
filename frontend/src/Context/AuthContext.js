import React, { createContext, useContext, useState, useEffect } from 'react'
import axiosInstance from '../Api/axios'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [role, setRole] = useState('')
	const [userId, setUserId] = useState(null)

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken')
		const refreshToken = localStorage.getItem('refreshToken')

		if (accessToken && refreshToken) {
			setIsLoggedIn(true)
			const decoded = jwtDecode(accessToken)
			setUserId(decoded.id)
			setRole(decoded.role)
		} else {
			setIsLoggedIn(false)
			setUserId(null)
			setRole('')
		}
	}, [])

	const login = async formData => {
		try {
			const response = await axiosInstance.post('/login', formData)
			localStorage.setItem('accessToken', response.data.accessToken)
			localStorage.setItem('refreshToken', response.data.refreshToken)
			setRole(response.data.user.role)
			setUserId(response.data.user.id)
			setIsLoggedIn(true)
		} catch (error) {
			if (error.response && error.response.data) {
				throw error
			} else {
				console.error('Błąd logowania:', error)
				throw new Error('Nieoczekiwany błąd. Spróbuj ponownie później.')
			}
		}
	}

	const logout = async () => {
		try {
			const refreshToken = localStorage.getItem('refreshToken')
			if (refreshToken) {
				await axiosInstance.delete('/logout', { data: { refreshToken } })
			}
			localStorage.removeItem('accessToken')
			localStorage.removeItem('refreshToken')
			setIsLoggedIn(false)
			setRole('')
		} catch (error) {
			console.error('Błąd podczas wylogowywania:', error)
		}
	}

	return <AuthContext.Provider value={{ isLoggedIn, role, login, logout, userId }}>{children}</AuthContext.Provider>
}
