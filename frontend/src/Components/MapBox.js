import React, { useEffect, useState, useRef } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import Supercluster from 'supercluster'
import { Rating, TextField, IconButton } from '@mui/material'
import { LocationFilled, Search, Close } from './Icons'
import { LoadScript, Autocomplete } from '@react-google-maps/api'
import { useTranslation } from 'react-i18next'

const LIBRARIES = ['places']

const MapComponent = () => {
	const [bars, setBars] = useState([])
	const { t } = useTranslation()
	const [popupInfo, setPopupInfo] = useState(null)
	const [viewport, setViewport] = useState({
		longitude: 19.0,
		latitude: 52.12,
		zoom: 5,
	})
	const [clusters, setClusters] = useState([])
	const [searchCity, setSearchCity] = useState('')
	const [searchedCity, setSearchedCity] = useState('')
	const superclusterRef = useRef(
		new Supercluster({
			radius: 40,
			maxZoom: 16,
		})
	)

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/bars?city=${searchedCity}`)
			.then(response => {
				setBars(response.data)
				handleSearchCity()
			})
			.catch(error => {
				console.error(t('fetchBarsError'), error)
			})
	}, [searchedCity])

	useEffect(() => {
		if (bars.length > 0) {
			const points = bars.map(bar => ({
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [bar.longitude, bar.latitude],
				},
				properties: bar,
			}))

			const supercluster = superclusterRef.current
			supercluster.load(points)

			const bounds = [-180, -85, 180, 85]
			setClusters(supercluster.getClusters(bounds, Math.floor(viewport.zoom)))
		}
	}, [bars, viewport])

	const handleClusterClick = cluster => {
		const supercluster = superclusterRef.current
		const barsInCluster = supercluster.getLeaves(cluster.id, Infinity)

		setPopupInfo({
			longitude: cluster.geometry.coordinates[0],
			latitude: cluster.geometry.coordinates[1],
			bars: barsInCluster.map(leaf => leaf.properties),
		})
	}

	const handleSearchCity = async () => {
		if (!searchCity) return

		try {
			const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
			const fullAddress = `${searchCity}`
			const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
				fullAddress
			)}&key=${GOOGLE_API_KEY}`

			console.log('Wysyłam zapytanie do Google API:', url)

			const geocodeResponse = await axios.get(url)

			console.log('Odpowiedź z API:', geocodeResponse.data)

			if (geocodeResponse.data.status !== 'OK') {
				console.error('Błąd geokodowania:', geocodeResponse.data.error_message)
				return
			}

			const location = geocodeResponse.data.results[0].geometry.location
			const { lat, lng } = location

			console.log('Nowe współrzędne:', lat, lng)

			setViewport(prev => ({
				...prev,
				longitude: lng,
				latitude: lat,
				zoom: 10,
			}))

			setSearchedCity(searchCity)
		} catch (error) {
			console.error('Błąd geokodowania:', error)
		}
	}

	const resetSearch = () => {
		setSearchedCity('')
		setSearchCity('')
		setViewport({
			longitude: 19.0,
			latitude: 52.12,
			zoom: 5,
		})
	}

	const handlePlaceChanged = () => {
		if (googleAutocompleteRef.current) {
			const place = googleAutocompleteRef.current.getPlace()
			if (place.geometry) {
				const { lat, lng } = place.geometry.location
				setSearchCity(place.name)
				setViewport(prev => ({
					...prev,
					longitude: lng(),
					latitude: lat(),
					zoom: 10,
				}))
				setSearchedCity(place.name)
			}
		}
	}

	const googleAutocompleteRef = useRef(null)

	return (
		<div>
			<div className='search-bar-container flex items-center mb-4'>
				<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={LIBRARIES}>
					<Autocomplete
						onLoad={autocomplete => {
							googleAutocompleteRef.current = autocomplete
						}}
						onPlaceChanged={handlePlaceChanged}>
						<TextField
							label={t('enterCity')}
							variant='outlined'
							value={searchCity}
							onChange={e => setSearchCity(e.target.value)}
							onKeyDown={e => {
								if (e.key === 'Enter') {
									handleSearchCity()
								}
							}}
							className='flex-1 rounded-lg py-2 px-4 shadow-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder={t('enterLocation')}
							slotProps={{
								input: {
									startAdornment: (
										<IconButton>
											<Search />
										</IconButton>
									),
								},
							}}
						/>
					</Autocomplete>
				</LoadScript>

				{searchCity && (
					<IconButton
						onClick={resetSearch}
						color='secondary'
						style={{ marginLeft: '8px', borderRadius: '50%', backgroundColor: 'red' }}>
						<Close className='w-3 h-3 text-white' />
					</IconButton>
				)}
			</div>

			{searchedCity && (
				<div className='inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-3 py-1.5 me-2 mb-3 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>
					<span className='city-name text-xs font-semibold'>{searchedCity}</span>
					<IconButton onClick={resetSearch} color='secondary' style={{ marginLeft: '8px' }}>
						<Close className='w-3 h-3 text-white' />
					</IconButton>
				</div>
			)}

			<Map
				style={{ width: '100%', height: '500px', borderRadius: '10px' }}
				mapStyle='mapbox://styles/mapbox/light-v11'
				mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
				{...viewport}
				onMove={evt => setViewport(evt.viewState)}>
				{clusters.map(cluster => {
					const [longitude, latitude] = cluster.geometry.coordinates
					const { cluster: isCluster, point_count: pointCount } = cluster.properties

					if (isCluster) {
						return (
							<Marker key={cluster.id} longitude={longitude} latitude={latitude}>
								<div
									onClick={e => {
										e.stopPropagation()
										handleClusterClick(cluster)
									}}
									style={{
										width: `${10 + pointCount}px`,
										height: `${10 + pointCount}px`,
										backgroundColor: 'rgba(255,0,0,0.5)',
										borderRadius: '50%',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										color: 'white',
										fontWeight: 'bold',
										cursor: 'pointer',
									}}>
									{pointCount}
								</div>
							</Marker>
						)
					}

					const bar = cluster.properties

					return (
						<Marker
							key={bar.id}
							longitude={longitude}
							latitude={latitude}
							anchor='bottom'
							onClick={e => {
								e.originalEvent.stopPropagation()
								setPopupInfo({
									longitude,
									latitude,
									bars: [bar],
								})
							}}>
							<div
								style={{
									backgroundColor: 'red',
									width: '10px',
									height: '10px',
									borderRadius: '50%',
									cursor: 'pointer',
								}}
							/>
						</Marker>
					)
				})}

				{popupInfo && (
					<Popup
						longitude={Number(popupInfo.longitude)}
						latitude={Number(popupInfo.latitude)}
						onClose={() => setPopupInfo(null)}>
						{popupInfo.bars.length === 1 ? (
							<div className='bg-white shadow-md rounded-md p-2 text-sm border border-gray-200 w-65'>
								<h3 className='font-semibold text-gray-800 mb-1'>{popupInfo.bars[0].name}</h3>

								<div className='flex items-center text-gray-500 mb-2'>
									<LocationFilled className='w-4 h-4 mr-1' />
									<p className='truncate'>{popupInfo.bars[0].address}</p>
								</div>

								<div className='flex items-center space-x-1'>
									<Rating name='read-only' value={popupInfo.bars[0].averageRating} readOnly size='small' />
									<span className='text-gray-600'>({popupInfo.bars[0].numberOfReviews})</span>
								</div>

								<a
									href={`/bar/${popupInfo.bars[0].id}`}
									className='text-blue-500 hover:underline text-xs mt-2 inline-block'>
									{t('viewDetails')}
								</a>
							</div>
						) : (
							<div className='bg-white shadow-md rounded-md p-2 text-sm border border-gray-200 w-65'>
								<h3 className='font-semibold text-gray-800 mb-1'>{t('barsInThisLocation')}</h3>
								<ul className='list-disc pl-4'>
									{popupInfo.bars.map(bar => (
										<li key={bar.id} className='mb-1'>
											<a href={`/bar/${bar.id}`} className='text-blue-500 hover:underline text-sm'>
												{bar.name}
											</a>
										</li>
									))}
								</ul>
							</div>
						)}
					</Popup>
				)}
			</Map>
		</div>
	)
}

export default MapComponent
