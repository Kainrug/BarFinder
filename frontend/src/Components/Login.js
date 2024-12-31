import React, { useState } from 'react'
import { useAuth } from '../Context/AuthContext'

function Login() {
	const { login, message, role } = useAuth()
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		await login(formData)
	}

	return (
		<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<img
					alt='Your Company'
					src='https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600'
					className='mx-auto h-10 w-auto'
				/>
				<h2 className='mt-10 text-center text-2xl font-bold tracking-tight text-gray-900'>Zaloguj się</h2>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				{message && (
					<div
						className={`mb-4 text-center text-sm ${message.includes('pomyślnie') ? 'text-green-600' : 'text-red-600'}`}>
						{message}
					</div>
				)}
				{role && <div className='mb-4 text-center text-sm text-gray-600'>Jesteś zalogowany jako: {role}</div>}
				<form onSubmit={handleSubmit} className='space-y-6'>
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
								className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm'
							/>
						</div>
					</div>

					<div>
						<label htmlFor='password' className='block text-sm font-medium text-gray-900'>
							Hasło
						</label>
						<div className='mt-2'>
							<input
								id='password'
								name='password'
								type='password'
								required
								onChange={handleChange}
								className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm'
							/>
						</div>
					</div>

					<div>
						<button
							type='submit'
							className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
							Zaloguj się
						</button>
					</div>
				</form>

				<p className='mt-10 text-center text-sm text-gray-500'>
					Nie masz konta?{' '}
					<a href='/register' className='font-semibold text-indigo-600 hover:text-indigo-500'>
						Zarejestruj się
					</a>
				</p>
			</div>
		</div>
	)
}

export default Login
