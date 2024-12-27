const { body, validationResult } = require('express-validator')

const validateBar = [
	body('name')
		.notEmpty()
		.withMessage('Nazwa baru jest wymagana.')
		.isLength({ min: 3, max: 50 })
		.withMessage('Nazwa musi mieć od 3 do 50 znaków.'),
	body('city')
		.notEmpty()
		.withMessage('Miasto jest wymagane.')
		.isAlpha('pl-PL', { ignore: ' ' })
		.withMessage('Miasto może zawierać tylko litery.'),
	body('address')
		.notEmpty()
		.withMessage('Adres jest wymagany.')
		.isLength({ min: 5 })
		.withMessage('Adres musi być bardziej szczegółowy.'),
	body('email').optional().isEmail().withMessage('Podaj prawidłowy adres e-mail.'),
	(req, res, next) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: 'Błąd walidacji', errors: errors.array() })
		}
		next()
	},
]

const validateBarUpdate = [
	body('name').optional().isLength({ min: 3, max: 50 }).withMessage('Nazwa musi mieć od 3 do 50 znaków.'),
	body('city').optional().isAlpha('pl-PL', { ignore: ' ' }).withMessage('Miasto może zawierać tylko litery.'),
	body('address').optional().isLength({ min: 5 }).withMessage('Adres musi być bardziej szczegółowy.'),
	(req, res, next) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: 'Błąd walidacji', errors: errors.array() })
		}
		next()
	},
]

module.exports = { validateBar, validateBarUpdate }
