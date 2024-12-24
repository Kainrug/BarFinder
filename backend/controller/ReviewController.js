const { Review, User } = require('../models')

const getReviews = async (req, res) => {
	try {
		const reviews = await Review.findAll({
			include: { model: User, attributes: ['username'] },
		})
		res.json(reviews)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const getReviewsByBar = async (req, res) => {
	try {
		const { barId } = req.params
		const reviews = await Review.findAll({ where: { Bar_ID: barId } })
		res.json(reviews)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const addReview = async (req, res) => {
	try {
		const userId = req.user.id // Pobranie ID użytkownika z JWT
		const { barId, stars, comment } = req.body

		const review = await Review.create({
			User_ID: userId,
			Bar_ID: barId,
			stars,
			comment,
		})

		res.status(201).json(review)
	} catch (error) {
		res.status(400).json({ message: 'Błąd walidacji', error: error.message })
	}
}

const deleteReview = async (req, res) => {
	try {
		const { id } = req.params
		const deleted = await Review.destroy({ where: { id } })
		if (!deleted) {
			return res.status(404).json({ message: 'Opinia nie znaleziona' })
		}
		res.json({ message: 'Opinia usunięta' })
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

module.exports = { getReviews, getReviewsByBar, addReview, deleteReview }
