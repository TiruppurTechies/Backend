const express = require('express')
const router = express.Router()
const controller = require('../controllers/userData')

/**
 * @swagger
 *  tags:
 *    name: UserData
 *    description: API Endpoints for managing UserData
 */

/**
 * @swagger
 * /userData:
 *   post:
 *     summary: Save the UserData 
 *     description: Post the userData to the database 
 *     tags: [UserData]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: Name of the user.
 *               mobile:
 *                 type: string
 *                 description: Mobile number of the user.
 *               password:
 *                 type: string
 *                 description: Password created by the user.
 *               confirmPassword:
 *                 type: string
 *                 description: It should be equal to the password.
 *     responses:
 *       200:
 *         description: UserData saved successfully
 *       400:
 *         description: Bad request error
 *       500:
 *         description: Internal server error
 */

router.post('/', controller.saveUserData)

module.exports = router
