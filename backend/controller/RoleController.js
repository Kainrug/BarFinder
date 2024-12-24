const { Role } = require('../models')

const getRoles = async (req, res) => {
	try {
		const roles = await Role.findAll()
		res.json(roles)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const createRole = async (req, res) => {
	try {
		const newRole = await Role.create(req.body)
		res.status(201).json(newRole)
	} catch (error) {
		res.status(400).json({ message: 'Błąd walidacji', error: error.message })
	}
}

module.exports = { getRoles, createRole }
