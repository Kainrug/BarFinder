const { Menu_Review, Menu, User } = require('../models')

// Pobieranie opinii dla danego menu
const getReviewsByMenu = async (req, res) => {
	try {
		const { menuId } = req.params

		// Pobieranie opinii związanych z menu
		const reviews = await Menu_Review.findAll({
			where: { Menu_ID: menuId },
			include: [{ model: User, attributes: ['id', 'username'] }],
		})

		res.status(200).json(reviews)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera.', error: error.message })
	}
}

// Tworzenie nowej opinii dla menu
const createReview = async (req, res) => {
	try {
		const { menuId } = req.params
		const { rating, comment } = req.body

		// Sprawdzanie, czy menu istnieje
		const menu = await Menu.findByPk(menuId)
		if (!menu) {
			return res.status(404).json({ message: 'Menu nie istnieje.' })
		}

		// Tworzenie opinii
		const newReview = await Menu_Review.create({
			Menu_ID: menuId,
			User_ID: req.user.id,
			rating,
			comment,
		})

		res.status(201).json({ message: 'Opinia dodana pomyślnie.', review: newReview })
	} catch (error) {
		res.status(400).json({ message: 'Błąd walidacji.', error: error.message })
	}
}

// Usuwanie opinii
const deleteMenuReview = async (req, res) => {
	try {
		const { reviewId } = req.params

		const review = await Menu_Review.findByPk(reviewId)
		if (!review) {
			return res.status(404).json({ message: 'Opinia nie istnieje.' })
		}

		
		if (req.user.role !== 'Admin' && req.user.id !== review.User_ID) {
			return res.status(403).json({ message: 'Brak uprawnień do usunięcia tej opinii.' })
		}

		await review.destroy()
		res.status(200).json({ message: 'Opinia została usunięta.' })
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera.', error: error.message })
	}
}

module.exports = { getReviewsByMenu, createReview, deleteMenuReview }
