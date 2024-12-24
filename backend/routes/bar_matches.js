const express = require('express')
const router = express.Router()
const { getBarMatches, createBarMatch, deleteBarMatch, getMatchesByBar } = require('../controller/BarMatchController')

router.get('/bar_matches', getBarMatches)
router.get('/bar_matches/bar/:barId', getMatchesByBar)
router.post('/bar_matches', createBarMatch)
router.delete('/bar_matches/:id', deleteBarMatch)

module.exports = router
