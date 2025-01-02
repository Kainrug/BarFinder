const errorHandler = (err, req, res, next) => {
	console.error(err.stack)

	if (err.name === 'SequelizeValidationError') {
		return res.status(400).json({
			message: 'Błąd walidacji bazy danych',
			errors: err.errors.map(e => e.message),
		})
	}

	if (err.name === 'UnauthorizedError') {
		return res.status(401).json({ message: 'Nieautoryzowany' })
	}

	res.status(500).json({
		message: 'Wewnętrzny błąd serwera',
		error: err.message,
	})
}

module.exports = { errorHandler }
