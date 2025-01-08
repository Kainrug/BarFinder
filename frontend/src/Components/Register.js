import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../Api/axios'
import { useTranslation } from 'react-i18next'

function Register() {
	const { t } = useTranslation()
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		role: 'Użytkownik',
	})

	const [message, setMessage] = useState('')
	const navigate = useNavigate()

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const response = await axiosInstance.post('/register', formData)
			setMessage(response.data.message)
			navigate('/login')
		} catch (error) {
			if (error.response?.data?.errors) {
				setMessage(error.response.data.errors.map(err => err.msg).join(', '))
			} else {
				setMessage(error.response?.data?.message || 'Wystąpił błąd')
			}
		}
	}

	return (
		<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<img alt='Bar Finder Logo' src='/logoBar.png' className='mx-auto h-10 w-auto rounded-full' />
				<h2 className='mt-10 text-center text-2xl font-bold tracking-tight text-gray-900'>{t('signUp')}</h2>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				{message && <div className='mb-4 text-center text-sm text-red-600'>{message}</div>}
				<form onSubmit={handleSubmit} className='space-y-6'>
					<div>
						<label htmlFor='username' className='block text-sm font-medium text-gray-900'>
							{t('usernameLabel')}
						</label>
						<div className='mt-2'>
							<input
								id='username'
								name='username'
								type='text'
								required
								onChange={handleChange}
								className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm'
							/>
						</div>
					</div>

					<div>
						<label htmlFor='email' className='block text-sm font-medium text-gray-900'>
							Email
						</label>
						<div className='mt-2'>
							<input
								id='email'
								name='email'
								type='email'
								required
								onChange={handleChange}
								className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm'
							/>
						</div>
					</div>

					<div>
						<label htmlFor='password' className='block text-sm font-medium text-gray-900'>
							{t('passwordLabel')}
						</label>
						<div className='mt-2'>
							<input
								id='password'
								name='password'
								type='password'
								required
								onChange={handleChange}
								className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm'
							/>
						</div>
					</div>

					<div>
						<label htmlFor='role' className='block text-sm font-medium text-gray-900'>
							{t('selectRole')}
						</label>
						<div className='mt-2'>
							<select
								id='role'
								name='role'
								onChange={handleChange}
								className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm'>
								<option value='Użytkownik'>{t('user')}</option>
								<option value='Właściciel Baru'>{t('barOwnerRole')}</option>
							</select>
						</div>
					</div>

					<div>
						<button
							type='submit'
							className='flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
							{t('signUp')}
						</button>
					</div>
				</form>

				<p className='mt-10 text-center text-sm text-gray-500'>
					{t('alreadyHaveAccount')}{' '}
					<a href='/login' className='font-semibold text-gray-800 hover:text-gray-600'>
						{t('login')}
					</a>
				</p>
			</div>
		</div>
	)
}

export default Register
