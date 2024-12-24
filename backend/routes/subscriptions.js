const express = require('express');
const router = express.Router();
const { getSubscriptions, createSubscription, deleteSubscription } = require('../controller/SubscriptionController');

router.get('/subscriptions', getSubscriptions);
router.post('/subscriptions', createSubscription);
router.delete('/subscriptions/:id', deleteSubscription);

module.exports = router;
