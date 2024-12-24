const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Role } = require('../models')

const register = async (req, res) => {
	try {
		const { username, email, password, role } = req.body

		// Sprawdzanie, czy email i username są unikalne
		const existingUser = await User.findOne({ where: { email } })
		if (existingUser) {
			return res.status(400).json({ message: 'Email jest już zajęty.' })
		}

		const existingUsername = await User.findOne({ where: { username } })
		if (existingUsername) {
			return res.status(400).json({ message: 'Nazwa użytkownika jest już zajęta.' })
		}

		// Walidacja roli - 'Użytkownik' lub 'Właściciel Baru'
		const validRoles = ['Użytkownik', 'Właściciel Baru', 'Gość']
		if (!validRoles.includes(role)) {
			return res
				.status(400)
				.json({ message: 'Nieprawidłowa rola. Możliwe role: "Użytkownik", "Właściciel Baru", "Gość".' })
		}

		// Pobieramy ID roli
		const userRole = await Role.findOne({ where: { role } })
		if (!userRole) {
			return res.status(400).json({ message: 'Rola nie istnieje.' })
		}

		// Hashowanie hasła
		const hashedPassword = await bcrypt.hash(password, 10)

		// Tworzenie nowego użytkownika
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

		// Sprawdzanie hasła
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(401).json({ message: 'Nieprawidłowe dane logowania.' })
		}

		// Generowanie tokenu
		const token = jwt.sign({ id: user.id, role: user.Role.role }, process.env.JWT_SECRET, { expiresIn: '1h' })

		res.json({ token, user: { id: user.id, username: user.username, role: user.Role.role } })
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera.', error: error.message })
	}
}

module.exports = { register, login }
