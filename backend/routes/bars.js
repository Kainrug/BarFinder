const express = require('express')
const router = express.Router()
const {
	getBars,
	getBarById,
	createBar,
	deleteBar,
	getBarsByLocation,
	updateBar,
	getSortedBars,
	getBarsByName,
} = require('../controller/BarController.js')

router.get('/bars', getBars)
router.post('/bars', createBar)
router.get('/bars/:id', getBarById)
router.put('/bars/:id', updateBar)
router.delete('/bars/:id', deleteBar)
router.post('/bars/location', getBarsByLocation)
router.get('/bars/name', getBarsByName);
module.exports = router
