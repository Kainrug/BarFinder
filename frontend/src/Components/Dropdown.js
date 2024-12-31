import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import clsx from 'clsx'

const cities = [
	{ id: 0, name: 'Brak filtrowania' },
	{ id: 1, name: 'Warszawa' },
	{ id: 2, name: 'Kraków' },
	{ id: 3, name: 'Łódź' },
	{ id: 4, name: 'Wrocław' },
	{ id: 5, name: 'Poznań' },
	{ id: 6, name: 'Gdańsk' },
	{ id: 7, name: 'Szczecin' },
	{ id: 8, name: 'Bydgoszcz' },
	{ id: 9, name: 'Lublin' },
	{ id: 10, name: 'Katowice' },
]

const CityDropdown = ({ onCityChange }) => {
	const [selectedCity, setSelectedCity] = useState(cities[0])

	const handleChange = city => {
		setSelectedCity(city)
		onCityChange?.(city.name)
	}

	return (
		<div className='relative mx-auto w-52'>
			<Listbox value={selectedCity} onChange={handleChange}>
				<div className='relative'>
					{/* Button to open the dropdown */}
					<ListboxButton
						className={clsx(
							'relative block w-full rounded-lg bg-gray-700 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white',
							'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
						)}>
						{selectedCity.name}
						<ChevronDownIcon
							className='group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white'
							aria-hidden='true'
						/>
					</ListboxButton>

					{/* Dropdown options */}
					<ListboxOptions
						className={clsx(
							'absolute z-50 mt-1 w-full rounded-lg border border-gray-600 bg-gray-700 text-white p-1 focus:outline-none',
							'transition duration-100 ease-in opacity-100',
							'shadow-lg'
						)}>
						{cities.map(city => (
							<ListboxOption
								key={city.id}
								value={city}
								className='group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-600'>
								<CheckIcon className='invisible size-4 fill-white group-data-[selected]:visible' />
								<div className='text-sm/6 text-white'>{city.name}</div>
							</ListboxOption>
						))}
					</ListboxOptions>
				</div>
			</Listbox>
		</div>
	)
}

export default CityDropdown
