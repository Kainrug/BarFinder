const { Bar, Review } = require('../models')
const { Sequelize, Op } = require('sequelize')
const axios = require('axios')

const getBars = async (req, res) => {
	try {
		const { minRating = 0, minReviews = 0 } = req.query

		const bars = await Bar.findAll({
			where: {
				averageRating: {
					[Op.gte]: minRating,
				},
			},
			include: [
				{
					model: Review,
					attributes: [],
				},
			],
			having: Sequelize.literal(`COUNT(Reviews.id) >= ${minReviews}`),
			group: ['Bar.id'],
		})

		res.json(bars)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const getBarById = async (req, res) => {
	try {
		const bar = await Bar.findByPk(req.params.id)
		if (!bar) {
			return res.status(404).json({ message: 'Bar nie znaleziony' })
		}
		res.json(bar)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const createBar = async (req, res) => {
	try {
		const { name, address, city, description, image_url } = req.body

		const fullAddress = `${address}, ${city}`

		const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
		const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
			fullAddress
		)}&key=${GOOGLE_API_KEY}`

		const response = await axios.get(url)

		if (response.data.status !== 'OK') {
			return res.status(400).json({ message: 'Nie udało się zgeokodować adresu' })
		}

		const location = response.data.results[0].geometry.location
		const latitude = location.lat
		const longitude = location.lng

		const newBar = await Bar.create({
			name,
			address,
			city,
			description,
			image_url,
			latitude,
			longitude,
		})

		res.status(201).json(newBar)
	} catch (error) {
		console.error('Błąd przy tworzeniu baru:', error.message)
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const updateBar = async (req, res) => {
	try {
		const updated = await Bar.update(req.body, {
			where: { id: req.params.id },
		})
		if (!updated[0]) {
			return res.status(404).json({ message: 'Bar nie znaleziony' })
		}
		res.json({ message: 'Bar zaktualizowany' })
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const deleteBar = async (req, res) => {
	try {
		const deleted = await Bar.destroy({ where: { id: req.params.id } })
		if (!deleted) {
			return res.status(404).json({ message: 'Bar nie znaleziony' })
		}
		res.json({ message: 'Bar usunięty' })
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const getBarsByLocation = async (req, res) => {
	try {
		const { city } = req.body
		const bars = await Bar.findAll({ where: { city } })
		if (bars.length === 0) {
			return res.status(404).json({ message: 'Nie znaleziono barów w tej lokalizacji' })
		}
		res.json(bars)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

const getBarsByName = async (req, res) => {
	const { name } = req.body
	try {
		const bars = await Bar.findAll({
			where: {
				name: {
					[Op.like]: `%${name}%`,
				},
			},
		})
		if (bars.length === 0) {
			return res.status(404).json({ message: 'Nie znaleziono barów o podanej nazwie.' })
		}
		res.json(bars)
	} catch (error) {
		res.status(500).json({ message: 'Błąd serwera', error: error.message })
	}
}

module.exports = {
	getBars,
	getBarById,
	createBar,
	deleteBar,
	getBarsByLocation,
	updateBar,
	getBarsByName,
}
