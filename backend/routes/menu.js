const express = require('express')
const router = express.Router()
const {
	getMenuItems,
	getMenuByBar,
	createMenuItem,
	deleteMenuItem,
	getMenuById,
} = require('../controller/MenuController')
const { authenticate, authorize } = require('../middleware/auth')

router.get('/menu', getMenuItems)
router.get('/menu/:id', getMenuById)
router.get('/bars/:barId/menu', getMenuByBar)
router.post('/bars/:barId/menu', authenticate, authorize(['Właściciel Baru', 'Admin']), createMenuItem)
router.delete('/bars/:barId/menu/:id', authenticate, authorize(['Właściciel Baru', 'Admin']), deleteMenuItem)

module.exports = router
