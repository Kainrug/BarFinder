const { Review, User, Bar } = require('../models')

const addReview = async (req, res) => {
	try {
		const { comment, rating } = req.body
		const { barId } = req.params

		const bar = await Bar.findByPk(barId)
		if (!bar) {
			return res.status(404).json({ message: 'Bar nie istnieje.' })
		}

		const newReview = await Review.create({
			User_ID: req.user.id,
			Bar_ID: barId,
			rating,
			comment,
		})

		await updateAverageRating(barId)

		res.status(201).json({ message: 'Opinia dodana pomyślnie.', review: newReview })
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera.', error: error.message })
	}
}

const getReviews = async (req, res) => {
	try {
		const { barId } = req.params
		const { page = 1, limit = 10, sortBy = 'createdAt', order = 'DESC' } = req.query

		const offset = (page - 1) * limit

		const reviews = await Review.findAll({
			where: { Bar_ID: barId },
			include: [{ model: User, attributes: ['id', 'username'] }],
			limit: parseInt(limit),
			offset,
			order: [[sortBy, order.toUpperCase()]],
		})

		res.status(200).json(reviews)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera.', error: error.message })
	}
}

const deleteReview = async (req, res) => {
	try {
		const { reviewId } = req.params

		const review = await Review.findByPk(reviewId)
		if (!review) {
			return res.status(404).json({ message: 'Opinia nie istnieje.' })
		}

		if (req.user.role !== 'Admin' && req.user.id !== review.User_ID) {
			return res.status(403).json({ message: 'Brak uprawnień do usunięcia tej opinii.' })
		}

		const barId = review.Bar_ID
		await review.destroy()

		await updateAverageRating(barId)

		res.status(200).json({ message: 'Opinia została usunięta.' })
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera.', error: error.message })
	}
}

const updateAverageRating = async barId => {
	const reviews = await Review.findAll({ where: { Bar_ID: barId } })

	if (reviews.length === 0) {
		await Bar.update({ averageRating: 0 }, { where: { id: barId } })
		return
	}

	const total = reviews.reduce((sum, review) => sum + review.rating, 0)
	const average = total / reviews.length

	await Bar.update({ averageRating: average.toFixed(2) }, { where: { id: barId } })
}

module.exports = { addReview, getReviews, deleteReview, updateAverageRating }
