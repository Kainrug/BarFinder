const express = require('express')
const { authenticate, authorize } = require('../middleware/auth')
const { addReview, getReviews, deleteReview } = require('../controller/ReviewController')

const router = express.Router()

router.post('/bars/:barId/reviews', authenticate, authorize(['Użytkownik', 'Właściciel Baru']), addReview)

router.get('/bars/:barId/reviews', getReviews)

router.delete('/reviews/:reviewId', authenticate, authorize(['Admin', 'Użytkownik']), deleteReview)

module.exports = router
