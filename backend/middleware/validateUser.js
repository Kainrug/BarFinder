const { body, validationResult } = require('express-validator')

const validateUserRegistration = [
	body('username')
		.notEmpty()
		.withMessage('Nazwa użytkownika jest wymagana.')
		.isLength({ min: 3, max: 30 })
		.withMessage('Nazwa użytkownika musi mieć od 3 do 30 znaków.'),
	body('email')
		.notEmpty()
		.withMessage('Adres e-mail jest wymagany.')
		.isEmail()
		.withMessage('Podaj prawidłowy adres e-mail.'),
	body('password')
		.notEmpty()
		.withMessage('Hasło jest wymagane.')
		.isLength({ min: 8 })
		.withMessage('Hasło musi mieć co najmniej 8 znaków.')
		.matches(/\d/)
		.withMessage('Hasło musi zawierać co najmniej jedną cyfrę.')
		.matches(/[a-zA-Z]/)
		.withMessage('Hasło musi zawierać co najmniej jedną literę.'),
	(req, res, next) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: 'Błąd walidacji', errors: errors.array() })
		}
		next()
	},
]

module.exports = { validateUserRegistration }
