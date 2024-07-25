const express = require('express')
const router = express.Router()
const controller = require('../controllers/menuItems')

//route path getAllmenuItems API
router.get('/',controller.getAllMenuItems) 

module.exports = router