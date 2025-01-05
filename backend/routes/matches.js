const express = require('express')
const router = express.Router()
const {
	getMatches,
	createMatches,
	updateMatches,
	deleteMatch,
	getMatchById,
} = require('../controller/MatchController.js')
const { authenticate, authorize } = require('../middleware/auth')
const { validateMatch } = require('../middleware/validateMatch.js')

router.get('/match', getMatches)
router.get('/match/:id', getMatchById)
router.post('/match', validateMatch, authenticate, createMatches)
router.put('/match/:id', authenticate, authorize(['Właściciel Baru', 'Admin']), updateMatches)
router.delete('/match/:id', authenticate, authorize(['Admin']), deleteMatch)

module.exports = router
