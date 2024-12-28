import React, { useEffect, useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'

const MapComponent = () => {
	const [bars, setBars] = useState([])
	const [popupInfo, setPopupInfo] = useState(null)

	useEffect(() => {
		axios
			.get('http://localhost:5000/api/bars')
			.then(response => {
				setBars(response.data)
			})
			.catch(error => {
				console.error('Błąd pobierania barów:', error)
			})
	}, [])

	return (
		<Map
			initialViewState={{
				longitude: 19.945,
				latitude: 50.0647,
				zoom: 6,
			}}
			style={{ width: '100%', height: '500px', borderRadius: '10px' }}
			mapStyle='mapbox://styles/mapbox/light-v11'
			mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}>
			{bars.map(
				bar =>
					bar.longitude &&
					bar.latitude && (
						<Marker
							key={bar.id}
							longitude={bar.longitude}
							latitude={bar.latitude}
							anchor='bottom'
							onClick={e => {
								e.originalEvent.stopPropagation()
								setPopupInfo(bar)
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
			)}

			{popupInfo && (
				<Popup
					anchor='top'
					longitude={Number(popupInfo.longitude)}
					latitude={Number(popupInfo.latitude)}
					onClose={() => setPopupInfo(null)}>
					<div>
						<h3>{popupInfo.name}</h3>
					</div>
				</Popup>
			)}
		</Map>
	)
}

export default MapComponent
