const express = require('express')
const router = express.Router()
const { getReviews, getReviewsByBar, createReview, deleteReview } = require('../controller/ReviewController')

router.get('/reviews', getReviews)
router.get('/reviews/bar/:barId', getReviewsByBar)
router.post('/reviews',authorize(['Użytkownik', 'Właściciel Baru', 'Admin']) , createReview)
router.delete('/reviews/:id', deleteReview)

module.exports = router
