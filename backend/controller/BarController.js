const { Bar } = require('../models')
const { Op } = require('sequelize')

const getBars = async (req, res) => {
	try {
		const bars = await Bar.findAll()
		res.json(bars)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const getBarById = async (req, res) => {
	try {
		const bar = await Bar.findByPk(req.params.id)
		if (!bar) {
			return res.status(404).json({ message: 'Bar nie znaleziony' })
		}
		res.json(bar)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const createBar = async (req, res) => {
	try {
		const newBar = await Bar.create(req.body)
		res.status(201).json(newBar)
	} catch (error) {
		res.status(400).json({ message: 'Błąd walidacji', error: error.message })
	}
}

const updateBar = async (req, res) => {
	try {
		const updated = await Bar.update(req.body, {
			where: { id: req.params.id },
		})
		if (!updated[0]) {
			return res.status(404).json({ message: 'Bar nie znaleziony' })
		}
		res.json({ message: 'Bar zaktualizowany' })
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const deleteBar = async (req, res) => {
	try {
		const deleted = await Bar.destroy({ where: { id: req.params.id } })
		if (!deleted) {
			return res.status(404).json({ message: 'Bar nie znaleziony' })
		}
		res.json({ message: 'Bar usunięty' })
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const getBarsByLocation = async (req, res) => {
	try {
		const { city } = req.body
		const bars = await Bar.findAll({ where: { city } })
		if (bars.length === 0) {
			return res.status(404).json({ message: 'Nie znaleziono barów w tej lokalizacji' })
		}
		res.json(bars)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const getBarsByName = async (req, res) => {
	const { name } = req.body
	try {
		const bars = await Bar.findAll({
			where: {
				name: {
					[Op.like]: `%${name}%`,
				},
			},
		})
		if (bars.length === 0) {
			return res.status(404).json({ message: 'Nie znaleziono barów o podanej nazwie.' })
		}
		res.json(bars)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

module.exports = {
	getBars,
	getBarById,
	createBar,
	deleteBar,
	getBarsByLocation,
	updateBar,
	getBarsByName,
}
