const { Subscription, Bar, Match, User } = require('../models')

const getSubscriptions = async (req, res) => {
	try {
		const userId = req.user.id

		const bars = await Bar.findAll({ where: { owner_id: userId } })
		const barIds = bars.map(bar => bar.id)

		const subscriptions = await Subscription.findAll({
			where: { Bar_ID: barIds },
			include: [
				{
					model: Bar,
					attributes: ['id', 'name'],
				},
				{
					model: Match,
					attributes: ['id', 'team_1', 'team_2', 'match_date'],
				},
				{
					model: User,
					attributes: ['id', 'username'],
				},
			],
		})

		res.json(subscriptions)
	} catch (error) {
		console.error('Error fetching subscriptions:', error)
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const createSubscription = async (req, res) => {
	try {
		const userId = req.user.id
		const { Bar_ID, Match_ID, users_to_come } = req.body

		const existingSubscription = await Subscription.findOne({
			where: { Bar_ID, Match_ID, User_ID: userId },
		})

		if (existingSubscription) {
			return res.status(400).json({ message: 'Użytkownik już zapisał się na ten mecz w tym barze.' })
		}

		const newSubscription = await Subscription.create({
			Bar_ID,
			Match_ID,
			User_ID: userId,
			users_to_come,
		})

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
