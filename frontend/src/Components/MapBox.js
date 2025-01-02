import React, { useEffect, useState, useRef } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import Supercluster from 'supercluster'
import { Rating } from '@mui/material'
import { LocationFilled } from './Icons'

const MapComponent = () => {
	const [bars, setBars] = useState([])
	const [popupInfo, setPopupInfo] = useState(null)
	const [viewport, setViewport] = useState({
		longitude: 19.0,
		latitude: 52.12,
		zoom: 5,
	})
	const [clusters, setClusters] = useState([])
	const [searchCity, setSearchCity] = useState('')
	const superclusterRef = useRef(
		new Supercluster({
			radius: 40,
			maxZoom: 16,
		})
	)

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/bars?city=${searchCity}`)
			.then(response => {
				setBars(response.data)
			})
			.catch(error => {
				console.error('Błąd pobierania barów:', error)
			})
	}, [searchCity])

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

	return (
		<div>
			<input
				type='text'
				placeholder='Wpisz miasto'
				value={searchCity}
				onChange={e => setSearchCity(e.target.value)}
				className='border rounded p-2 mb-4'
			/>

			<Map
				initialViewState={viewport}
				style={{ width: '100%', height: '500px', borderRadius: '10px' }}
				mapStyle='mapbox://styles/mapbox/light-v11'
				mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
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
									View Details
								</a>
							</div>
						) : (
							<div className='bg-white shadow-md rounded-md p-2 text-sm border border-gray-200 w-65'>
								<h3 className='font-semibold text-gray-800 mb-1'>Bary w tej lokalizacji:</h3>
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
