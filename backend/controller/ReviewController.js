const { Review, User, Bar } = require('../models')

// Dodawanie opinii
const addReview = async (req, res) => {
	try {
		const { comment, rating } = req.body
		const { barId } = req.params

		// Sprawdzanie, czy bar istnieje
		const bar = await Bar.findByPk(barId)
		if (!bar) {
			return res.status(404).json({ message: 'Bar nie istnieje.' })
		}

		// Dodawanie opinii
		const newReview = await Review.create({
			User_ID: req.user.id,
			Bar_ID: barId,
			rating,
			comment,
		})

		res.status(201).json({ message: 'Opinia dodana pomyślnie.', review: newReview })
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera.', error: error.message })
	}
}

// Pobieranie opinii o danym barze
const getReviews = async (req, res) => {
	try {
		const { barId } = req.params

		// Pobieranie opinii
		const reviews = await Review.findAll({
			where: { Bar_ID: barId },
			include: [{ model: User, attributes: ['id', 'username'] }],
		})

		res.status(200).json(reviews)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera.', error: error.message })
	}
}

// Usuwanie opinii
const deleteReview = async (req, res) => {
	try {
		const { reviewId } = req.params

		// Znalezienie opinii
		const review = await Review.findByPk(reviewId)
		if (!review) {
			return res.status(404).json({ message: 'Opinia nie istnieje.' })
		}

		// Sprawdzanie uprawnień
		if (req.user.role !== 'Admin' && req.user.id !== review.User_ID) {
			return res.status(403).json({ message: 'Brak uprawnień do usunięcia tej opinii.' })
		}

		// Usuwanie opinii
		await review.destroy()
		res.status(200).json({ message: 'Opinia została usunięta.' })
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera.', error: error.message })
	}
}

module.exports = { addReview, getReviews, deleteReview }
