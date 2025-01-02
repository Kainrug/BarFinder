const express = require('express')
const router = express.Router()
const {
	getBars,
	getBarById,
	createBar,
	deleteBar,
	getBarsByLocation,
	updateBar,
	getBarsByName,
} = require('../controller/BarController.js')
const { authenticate, authorize } = require('../middleware/auth')
const { validateBar, validateBarUpdate } = require('../middleware/validateBar')

router.get('/bars', getBars)
router.post('/bars', validateBar, authenticate, authorize(['Właściciel Baru', 'Admin']), createBar)
router.get('/bars/:id', getBarById)
router.put('/bars/:id', validateBarUpdate, authenticate, authorize(['Admin', 'Właściciel Baru']), updateBar)
router.delete('/bars/:id', authenticate, authorize(['Admin']), deleteBar)
router.post('/bars/location', getBarsByLocation)
router.post('/bars/name', getBarsByName)
module.exports = router
