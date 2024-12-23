const { where } = require('sequelize')
const { Match } = require('../models')

const getMatches = async (req, res) => {
	try {
		const matches = await Match.findAll()
		res.json(matches)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const getMatchById = async (req, res) => {
	try {
		const matches = await Match.findByPk(req.params.id)
		if (!matches) {
			return res.status(404).json({ message: 'Mecz nie znaleziony' })
		}
		res.json(matches)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const createMatches = async (req, res) => {
	try {
		const newMatch = await Match.create(req.body)
		res.status(201).json(newMatch)
	} catch (error) {
		res.status(400).json({ message: 'Błąd walidacji', error: error.message })
	}
}

const updateMatches = async (req, res) => {
	try {
		const updated = await Match.update(req.body, {
			where: { id: req.params.id },
		})
		if (!updated[0]) {
			return res.status(404).json({ message: 'Mecz nie znaleziony' })
		}
		res.json({ message: 'Mecz zaktualizowany' })
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const deleteMatch = async (req, res) => {
	try {
		const deleted = await Match.destroy({ where: { id: req.params.id } })
		if (!deleted) {
			return res.status(404).json({ message: 'Mecz nie znaleziony' })
		}
		res.json({ message: 'Mecz usunięty' })
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}
module.exports = {
	getMatches,
	createMatches,
	updateMatches,
	deleteMatch,
	getMatchById,
}
