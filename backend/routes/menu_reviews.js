const express = require('express')
const { getReviewsByMenu, createReview, deleteMenuReview } = require('../controller/MenuReviewController')
const { authenticate, authorize } = require('../middleware/auth')
const { validateReview } = require('../middleware/validateReview')

const router = express.Router()

router.get('/menus/:menuId/reviews', getReviewsByMenu)

router.post(
	'/menus/:menuId/reviews',
	validateReview,
	authenticate,
	authorize(['Użytkownik', 'Właściciel Baru']),
	createReview
)

router.delete(
	'/menus/:menuId/reviews/:reviewId',
	authenticate,
	authorize(['Admin', 'Użytkownik', 'Właściciel Baru']),
	deleteMenuReview
)

module.exports = router
