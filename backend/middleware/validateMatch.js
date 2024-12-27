const { body, param, validationResult } = require('express-validator')

const validateMatch = [
	body('sport')
		.notEmpty()
		.withMessage('Dyscyplina sportowa jest wymagana.')
		.isLength({ max: 50 })
		.withMessage('Dyscyplina sportowa nie może przekraczać 50 znaków.'),
	body('team_1')
		.notEmpty()
		.withMessage('Pierwsza drużyna jest wymagana.')
		.isLength({ max: 50 })
		.withMessage('Nazwa drużyny nie może przekraczać 50 znaków.'),
	body('team_2')
		.notEmpty()
		.withMessage('Druga drużyna jest wymagana.')
		.isLength({ max: 50 })
		.withMessage('Nazwa drużyny nie może przekraczać 50 znaków.'),
	body('match_date')
		.notEmpty()
		.withMessage('Data meczu jest wymagana.')
		.isISO8601()
		.withMessage('Data meczu musi być w formacie ISO8601.')
		.isAfter(new Date().toISOString())
		.withMessage('Data meczu musi być w przyszłości.'),
	(req, res, next) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: 'Błąd walidacji', errors: errors.array() })
		}
		next()
	},
]

module.exports = { validateMatch }
