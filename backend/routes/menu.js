const express = require('express')
const router = express.Router()
const { getMenuItems, getMenuByBar, createMenuItem, deleteMenuItem } = require('../controller/MenuController')

router.get('/menu', getMenuItems)
router.get('/menu/bar/:barId', getMenuByBar)
router.post('/menu', createMenuItem)
router.delete('/menu/:id', deleteMenuItem)

module.exports = router
