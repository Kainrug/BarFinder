const { Menu_Review, User } = require('../models')

const getReviewsByMenu = async (req, res) => {
	try {
		const { menuId } = req.params
		const reviews = await Menu_Review.findAll({
			where: { Menu_ID: menuId },
			include: [{ model: User, attributes: ['username'] }],
		})
		res.json(reviews)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const createReview = async (req, res) => {
	try {
		const { Menu_ID, rating, comment, User_ID } = req.body

		const newReview = await Menu_Review.create({
			Menu_ID,
			rating,
			comment,
			User_ID,
		})

		res.status(201).json(newReview)
	} catch (error) {
		res.status(400).json({ message: 'Błąd walidacji', error: error.message })
	}
}

module.exports = { getReviewsByMenu, createReview }
