const { Bar_matches } = require('../models')

const getBarMatches = async (req, res) => {
	try {
		const barMatches = await Bar_matches.findAll()
		res.json(barMatches)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const getMatchesByBar = async (req, res) => {
	try {
		const { barId } = req.params
		const matches = await Bar_matches.findAll({ where: { Bar_ID: barId } })
		res.json(matches)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const createBarMatch = async (req, res) => {
	try {
		const { Bar_ID, Match_ID } = req.body

		const existing = await Bar_matches.findOne({ where: { Bar_ID, Match_ID } })
		if (existing) {
			return res.status(400).json({ message: 'Taka transmisja już istnieje.' })
		}

		const newBarMatch = await Bar_matches.create({ Bar_ID, Match_ID })
		res.status(201).json(newBarMatch)
	} catch (error) {
		res.status(400).json({ message: 'Błąd walidacji', error: error.message })
	}
}

const deleteBarMatch = async (req, res) => {
	try {
		const { id } = req.params
		const deleted = await Bar_matches.destroy({ where: { id } })
		if (!deleted) {
			return res.status(404).json({ message: 'Transmisja nie znaleziona' })
		}
		res.json({ message: 'Transmisja usunięta' })
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

module.exports = { getBarMatches, createBarMatch, deleteBarMatch, getMatchesByBar }
