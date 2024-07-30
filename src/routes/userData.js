const express = require('express')
const router = express.Router()
const controller = require('../controllers/userData')

router.post('/',controller.saveUserData)

module.exports = router

