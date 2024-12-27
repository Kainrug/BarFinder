const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Role, RefreshToken } = require('../models')

const register = async (req, res) => {
	try {
		const { username, email, password, role } = req.body

		const existingUser = await User.findOne({ where: { email } })
		if (existingUser) {
			return res.status(400).json({ message: 'Email jest już zajęty.' })
		}

		const existingUsername = await User.findOne({ where: { username } })
		if (existingUsername) {
			return res.status(400).json({ message: 'Nazwa użytkownika jest już zajęta.' })
		}

		const validRoles = ['Użytkownik', 'Właściciel Baru', 'Gość']
		if (!validRoles.includes(role)) {
			return res
				.status(400)
				.json({ message: 'Nieprawidłowa rola. Możliwe role: "Użytkownik", "Właściciel Baru", "Gość".' })
		}

		const userRole = await Role.findOne({ where: { role } })
		if (!userRole) {
			return res.status(400).json({ message: 'Rola nie istnieje.' })
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const newUser = await User.create({
			username,
			email,
			password: hashedPassword,
			Role_ID: userRole.id,
		})

		res.status(201).json({ message: 'Rejestracja zakończona pomyślnie.', user: newUser })
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera.', error: error.message })
	}
}

const login = async (req, res) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ where: { email }, include: Role })
		if (!user) {
			return res.status(404).json({ message: 'Nie znaleziono użytkownika.' })
		}

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(401).json({ message: 'Nieprawidłowe dane logowania.' })
		}

		const accessToken = jwt.sign({ id: user.id, role: user.Role.role }, process.env.JWT_SECRET, { expiresIn: '15m' })
		const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH)

		await RefreshToken.create({
			token: refreshToken,
			User_ID: user.id,
			expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
		})

		res.json({
			accessToken,
			refreshToken,
			user: { id: user.id, username: user.username, role: user.Role.role },
		})
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera.', error: error.message })
	}
}

const refreshToken = async (req, res) => {
	try {
		const { token } = req.body

		if (!token) {
			return res.status(400).json({ message: 'Brak tokena.' })
		}

		const storedToken = await RefreshToken.findOne({ where: { token } })
		if (!storedToken) {
			return res.status(403).json({ message: 'Nieprawidłowy token.' })
		}

		const decoded = jwt.verify(token, process.env.JWT_REFRESH)

		const newAccessToken = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.JWT_SECRET, {
			expiresIn: '15m',
		})

		res.json({ accessToken: newAccessToken })
	} catch (error) {
		res.status(403).json({ message: 'Token jest nieprawidłowy lub wygasł.', error: error.message })
	}
}

const logout = async (req, res) => {
	try {
		const { refreshToken } = req.body

		await RefreshToken.destroy({ where: { token: refreshToken } })

		if (!refreshToken) {
			return res.status(400).json({ message: 'Brak tokena.' })
		}

		res.status(204).send()
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera.', error: error.message })
	}
}

module.exports = { register, login, refreshToken, logout }
