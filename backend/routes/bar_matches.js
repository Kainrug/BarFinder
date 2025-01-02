const express = require('express')
const router = express.Router()
const { getBarMatches, createBarMatch, deleteBarMatch, getMatchesByBar } = require('../controller/BarMatchController')
const { authenticate, authorize } = require('../middleware/auth')

router.get('/bar_matches', getBarMatches)
router.get('/bar_matches/bar/:barId', getMatchesByBar)
router.post('/bar_matches', authenticate, authorize(['Admin', 'Właściciel Baru']), createBarMatch)
router.delete('/bar_matches/:id', authenticate, authorize(['Admin', 'Właściciel Baru']), deleteBarMatch)

module.exports = router
