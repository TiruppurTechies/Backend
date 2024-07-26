const express = require('express')
const router = express.Router()
const controller = require('../controllers/menuItems')

//route path getAllmenuItems API
router.get('/',controller.getAllMenuItems) 
router.get('/veg',controller.getVegMenuItems)
router.get('/nonveg',controller.getNonVegMenuItems)
module.exports = router