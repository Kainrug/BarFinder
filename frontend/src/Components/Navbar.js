import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import { Add } from '@mui/icons-material'

const navigation = [
	{ name: 'Strona Główna', href: '/', current: false },
	{ name: 'Bary', href: '/bars', current: false },
	{ name: 'Mecze', href: '/match', current: false },
	{ name: 'Informacje', href: '#', current: false },
]

const Navbar = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { isLoggedIn, logout, role } = useAuth()

	const handleLogout = () => {
		logout()
		navigate('/')
	}

	const classNames = (...classes) => {
		return classes.filter(Boolean).join(' ')
	}

	return (
		<Disclosure as='nav' className='bg-gray-900'>
			<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
				<div className='relative flex h-16 items-center justify-between'>
					{/* Menu button for mobile */}
					<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
						<DisclosureButton className='group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
							<span className='absolute -inset-0.5' />
							<span className='sr-only'>Open main menu</span>
							<Bars3Icon aria-hidden='true' className='block size-6 group-data-[open]:hidden' />
							<XMarkIcon aria-hidden='true' className='hidden size-6 group-data-[open]:block' />
						</DisclosureButton>
					</div>

					{/* Logo and Navigation Items */}
					<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
						<div className='flex shrink-0 items-center'>
							<Link to='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
								<span className='self-center text-2xl font-semibold text-white'>BarFinder</span>
							</Link>
						</div>
						<div className='hidden sm:ml-6 sm:block'>
							<div className='flex space-x-4'>
								{navigation.map(item => (
									<Link
										key={item.name}
										to={item.href}
										className={classNames(
											location.pathname === item.href
												? 'bg-gray-950 text-white'
												: 'text-gray-300 hover:bg-gray-700 hover:text-white',
											'rounded-md px-3 py-2 text-sm font-medium'
										)}>
										{item.name}
									</Link>
								))}
							</div>
						</div>
					</div>
					<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
						{isLoggedIn && role === 'Właściciel Baru' && (
							<Link to='/add-bar'>
								<button className='inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mt-2'>
									<Add className='mr-2' />
									Dodaj bar
								</button>
							</Link>
						)}

						{isLoggedIn ? (
							<Menu as='div' className='relative ml-3'>
								<div>
									<MenuButton className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
										<span className='sr-only'>Open user menu</span>
										<img
											alt='User Avatar'
											className='h-8 w-8 rounded-full'
											src='https://www.w3schools.com/howto/img_avatar.png'
										/>
									</MenuButton>
								</div>
								<MenuItems className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
									<MenuItem>
										<Link to='/profile' className='block px-4 py-2 text-sm text-gray-700'>
											Twój profil
										</Link>
									</MenuItem>
									<MenuItem>
										<Link to='/settings' className='block px-4 py-2 text-sm text-gray-700'>
											Ustawienia
										</Link>
									</MenuItem>
									<MenuItem>
										<button onClick={handleLogout} className='block w-full px-4 py-2 text-left text-sm text-gray-700'>
											Wyloguj się
										</button>
									</MenuItem>
								</MenuItems>
							</Menu>
						) : (
							<Link to='/register'>
								<button className='border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full'>
									<span>Zarejestruj się</span>
									<span className='absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px' />
								</button>
							</Link>
						)}
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<DisclosurePanel className='sm:hidden'>
				<div className='space-y-1 px-2 pb-3 pt-2'>
					{navigation.map(item => (
						<DisclosureButton
							key={item.name}
							as='a'
							href={item.href}
							aria-current={item.current ? 'page' : undefined}
							className={classNames(
								location.pathname === item.href
									? 'bg-gray-900 text-white'
									: 'text-gray-300 hover:bg-gray-700 hover:text-white',
								'block rounded-md px-3 py-2 text-base font-medium'
							)}>
							{item.name}
						</DisclosureButton>
					))}
				</div>
			</DisclosurePanel>
		</Disclosure>
	)
}

export default Navbar
