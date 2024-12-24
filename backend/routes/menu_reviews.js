const express = require('express')
const router = express.Router()
const { getReviewsByMenu, createReview } = require('../controller/MenuReviewController')

router.get('/menu_reviews/:menuId', getReviewsByMenu)
router.post('/menu_reviews', createReview)

module.exports = router
