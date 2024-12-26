const express = require('express')
const { register, login, refreshToken, logout } = require('../controller/UserController')
const { authenticate, authorize } = require('../middleware/auth')

const router = express.Router()


router.post('/register', register)

router.post('/login', login)

router.post('/refresh-token', refreshToken)

router.post('/logout', authenticate, logout)

router.get('/users', authenticate, authorize(['Admin']), async (req, res) => {
	const { User, Role } = require('../models')
	try {
		const users = await User.findAll({ include: { model: Role, attributes: ['role'] } })
		res.json(users)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera.', error: error.message })
	}
})

module.exports = router
