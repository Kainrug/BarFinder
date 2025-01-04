const express = require('express')
const router = express.Router()
const { getMenuItems, getMenuByBar, createMenuItem, deleteMenuItem } = require('../controller/MenuController')
const { authenticate, authorize } = require('../middleware/auth')

router.get('/menu', getMenuItems)
router.get('/bars/:barId/menu', getMenuByBar)
router.post('/menu', authenticate, createMenuItem)
router.delete('/menu/:id', authenticate, authorize(['Właściciel Baru', 'Admin']), deleteMenuItem)

module.exports = router
