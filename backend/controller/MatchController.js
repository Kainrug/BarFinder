const { Op } = require('sequelize')
const { Match, Bar } = require('../models')

const getMatches = async (req, res) => {
	try {
		const { sport } = req.query

		const matches = await Match.findAll({
			where: sport ? { sport: { [Op.like]: `%${sport}%` } } : {},
		})

		res.json(matches)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const getMatchById = async (req, res) => {
	try {
		const match = await Match.findByPk(req.params.id, {
			include: [
				{
					model: Bar,
					through: { attributes: [] },
					attributes: ['id', 'name', 'address'],
				},
			],
		})

		if (!match) {
			return res.status(404).json({ message: 'Mecz nie znaleziony' })
		}

		res.json(match)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const createMatches = async (req, res) => {
	try {
		const { sport, team_1, team_2, match_date } = req.body

		if (!sport || !team_1 || !team_2 || !match_date) {
			return res.status(400).json({ message: 'Wszystkie pola są wymagane.' })
		}

		const newMatch = await Match.create({ sport, team_1, team_2, match_date })
		res.status(201).json({ message: 'Mecz został dodany.', match: newMatch })
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
