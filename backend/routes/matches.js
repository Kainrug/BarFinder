const express = require('express')
const router = express.Router()
const {
	getMatches,
	createMatches,
	updateMatches,
	deleteMatch,
	getMatchById,
} = require('../controller/MatchController.js')

router.get('/match', getMatches)
router.get('/match/:id', getMatchById)
router.post('/match', createMatches)
router.put('/match/:id', updateMatches)
router.delete('/match/:id', deleteMatch)

module.exports = router
