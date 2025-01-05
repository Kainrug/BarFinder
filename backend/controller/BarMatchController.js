const { Bar_matches, Bar } = require('../models')

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

		const barWithMatches = await Bar.findByPk(barId, {
			include: [
				{
					model: Match,
					through: { attributes: [] },
					attributes: ['id', 'sport', 'team_1', 'team_2', 'match_date'],
				},
			],
		})

		if (!barWithMatches) {
			return res.status(404).json({ message: 'Bar nie znaleziony' })
		}

		res.json(barWithMatches)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const assignMatchToBar = async (req, res) => {
	try {
		const { Bar_ID, Match_ID } = req.body
		const userId = req.user.id

		const bar = await Bar.findOne({ where: { id: Bar_ID } })
		if (!bar) {
			return res.status(400).json({ message: 'Bar o podanym ID nie istnieje.' })
		}

		if (bar.owner_id !== userId) {
			return res.status(403).json({ message: 'Tylko właściciel baru może przypisać mecz.' })
		}

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

module.exports = { getBarMatches, assignMatchToBar, deleteBarMatch, getMatchesByBar }
