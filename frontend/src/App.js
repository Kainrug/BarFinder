import React from 'react'
import Navbar from './Components/Navbar'
import Register from './Components/Register'
import Login from './Components/Login'
import Bars from './Components/Bars'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import HeroPage from './Components/hero'
import BarDetails from './Components/BarDetails'
import MatchesList from './Components/MatchList'
import MatchDetails from './Components/MatchDetails'
import BarMenu from './Components/BarMenu'
import MenuDetails from './Components/MenuDetails'
import AddBar from './Components/AddBar'
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
					<Route path='/match' element={<MatchesList />} />
					<Route path='/match/:id' element={<MatchDetails />} />
					<Route path='/bars/:id/menu' element={<BarMenu />} />
					<Route path='/menu/:id' element={<MenuDetails />} />
					<Route path='/add-bar' element={<AddBar />} />
				</Routes>
			</Router>
		</AuthProvider>
	)
}

export default App
