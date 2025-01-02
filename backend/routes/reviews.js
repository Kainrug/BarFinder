const express = require('express')
const { authenticate, authorize } = require('../middleware/auth')
const { addReview, getReviews, deleteReview, updateReview } = require('../controller/ReviewController')
const { validateReview } = require('../middleware/validateReview')
const router = express.Router()

router.post('/bars/:barId/reviews',validateReview, authenticate, authorize(['Użytkownik', 'Właściciel Baru']), addReview)

router.patch('/reviews/:reviewId', authenticate, authorize(['Właściciel Baru', 'Użytkownik']), updateReview)

router.get('/bars/:barId/reviews', getReviews)

router.delete('/reviews/:reviewId', authenticate, authorize(['Admin', 'Użytkownik']), deleteReview)

module.exports = router
