const express = require('express')
const router = express.Router()
const { getSubscriptions, createSubscription, deleteSubscription } = require('../controller/SubscriptionController')
const { authenticate, authorize } = require('../middleware/auth')

router.get('/subscriptions', getSubscriptions)
router.post('/subscriptions', authenticate, createSubscription)
router.delete('/subscriptions/:id', authenticate, authorize(['Admin']), deleteSubscription)

module.exports = router
