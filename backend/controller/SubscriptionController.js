const { Subscription } = require('../models')

const getSubscriptions = async (req, res) => {
	try {
		const subscriptions = await Subscription.findAll()
		res.json(subscriptions)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const createSubscription = async (req, res) => {
	try {
		const newSubscription = await Subscription.create(req.body)
		res.status(201).json(newSubscription)
	} catch (error) {
		res.status(400).json({ message: 'Błąd walidacji', error: error.message })
	}
}

const deleteSubscription = async (req, res) => {
	try {
		const { id } = req.params
		const deleted = await Subscription.destroy({ where: { id } })
		if (!deleted) {
			return res.status(404).json({ message: 'Subskrypcja nie znaleziona' })
		}
		res.json({ message: 'Subskrypcja usunięta' })
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

module.exports = { getSubscriptions, createSubscription, deleteSubscription }
