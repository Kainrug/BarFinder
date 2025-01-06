const { Menu, Menu_Review, Bar } = require('../models')
const sequelize = require('sequelize')

const getMenuItems = async (req, res) => {
	try {
		const items = await Menu.findAll()
		res.json(items)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const getMenuByBar = async (req, res) => {
	try {
		const { barId } = req.params

		const page = parseInt(req.query.page) || 1
		const limit = parseInt(req.query.limit) || 10

		const items = await Menu.findAll({ where: { Bar_ID: barId } })

		const startIndex = (page - 1) * limit
		const endIndex = page * limit

		const results = {}

		if (endIndex < items.length) {
			results.next = {
				page: page + 1,
				limit: limit,
			}
		}

		if (startIndex > 0) {
			results.previous = {
				page: page - 1,
				limit: limit,
			}
		}

		results.results = items.slice(startIndex, endIndex)
		res.json(results)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const createMenuItem = async (req, res) => {
	try {
		const { barId } = req.params
		const userId = req.user.id

		const bar = await Bar.findByPk(barId)
		if (!bar) {
			return res.status(404).json({ message: 'Bar nie znaleziony' })
		}

		if (bar.owner_id !== userId) {
			return res.status(403).json({ message: 'Tylko właściciel baru może dodać pozycje do menu' })
		}

		const newItem = await Menu.create({
			...req.body,
			Bar_ID: barId,
		})

		res.status(201).json(newItem)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const getMenuById = async (req, res) => {
	try {
		const menuItem = await Menu.findByPk(req.params.id, {
			include: [
				{
					model: Menu_Review,
					attributes: [],
				},
			],
			attributes: {
				include: [
					[sequelize.fn('AVG', sequelize.col('Menu_Reviews.rating')), 'averageRating'],
					[sequelize.fn('COUNT', sequelize.col('Menu_Reviews.id')), 'numberOfReviews'],
				],
			},
			group: ['Menu.id'],
		})

		if (!menuItem) {
			return res.status(404).json({ message: 'Pozycja menu nie znaleziona' })
		}

		res.json(menuItem)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const deleteMenuItem = async (req, res) => {
	try {
		const { id, barId } = req.params
		const userId = req.user.id

		const bar = await Bar.findByPk(barId)
		if (!bar) {
			return res.status(404).json({ message: 'Bar nie znaleziony' })
		}

		if (bar.owner_id !== userId) {
			return res.status(403).json({ message: 'Tylko właściciel baru może usunąć pozycję z menu' })
		}

		const deleted = await Menu.destroy({ where: { id, Bar_ID: barId } })
		if (!deleted) {
			return res.status(404).json({ message: 'Pozycja w menu nie znaleziona' })
		}

		res.json({ message: 'Pozycja usunięta z menu' })
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

module.exports = { getMenuItems, getMenuByBar, createMenuItem, deleteMenuItem, getMenuById }
