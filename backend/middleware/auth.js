const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1]
	if (!token) {
		return res.status(401).json({ message: 'Brak tokenu uwierzytelniającego.' })
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		req.user = decoded
		next()
	} catch (error) {
		res.status(401).json({ message: 'Nieprawidłowy token.' })
	}
}

const authorize = roles => (req, res, next) => {
	if (!roles.includes(req.user.role)) {
		return res.status(403).json({ message: 'Brak uprawnień.' })
	}
	next()
}

module.exports = { authenticate, authorize }
