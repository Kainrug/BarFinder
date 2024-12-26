const express = require('express')
const { authenticate, authorize } = require('../middleware/auth')
const { getReviewsByMenu, createReview, deleteMenuReview } = require('../controller/MenuReviewController')
const { authenticate, authorize } = require('../middleware/auth')

const router = express.Router()

router.get('/menus/:menuId/reviews', getReviewsByMenu)

router.post('/menus/:menuId/reviews', authenticate, authorize(['Użytkownik', 'Właściciel Baru']), createReview)

router.delete('/menu-reviews/:reviewId', authenticate, authorize(['Admin', 'Użytkownik']), deleteMenuReview)

module.exports = router
