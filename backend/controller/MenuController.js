const { Menu } = require('../models')

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
		const items = await Menu.findAll({ where: { Bar_ID: barId } })
		res.json(items)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const createMenuItem = async (req, res) => {
	try {
		const newItem = await Menu.create(req.body)
		res.status(201).json(newItem)
	} catch (error) {
		res.status(400).json({ message: 'Błąd walidacji', error: error.message })
	}
}

const deleteMenuItem = async (req, res) => {
	try {
		const { id } = req.params
		const deleted = await Menu.destroy({ where: { id } })
		if (!deleted) {
			return res.status(404).json({ message: 'Pozycja w menu nie znaleziona' })
		}
		res.json({ message: 'Pozycja usunięta z menu' })
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

module.exports = { getMenuItems, getMenuByBar, createMenuItem, deleteMenuItem }
