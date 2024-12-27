const { body, validationResult } = require('express-validator')

const validateReview = [
	body('rating')
		.notEmpty()
		.withMessage('Ocena jest wymagana.')
		.isInt({ min: 1, max: 5 })
		.withMessage('Ocena musi być liczbą między 1 a 5.'),
	body('comment').optional().isLength({ max: 500 }).withMessage('Komentarz nie może przekraczać 500 znaków.'),
	(req, res, next) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: 'Błąd walidacji', errors: errors.array() })
		}
		next()
	},
]

module.exports = { validateReview }
