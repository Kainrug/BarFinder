import React from 'react'
import Navbar from './Components/Navbar'
import Register from './Components/Register'
import Login from './Components/Login'
import Bars from './Components/Bars'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import HeroPage from './Components/hero'
import BarDetails from './Components/BarDetails'

function App() {
	return (
		<AuthProvider>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<HeroPage />}></Route>
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='/bars' element={<Bars />} />
					<Route path='/bar/:id' element={<BarDetails />} />
				</Routes>
			</Router>
		</AuthProvider>
	)
}

export default App
