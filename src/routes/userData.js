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
/**
 * @swagger
 * /userData/{userTag}/cart:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [UserData]
 *     parameters:
 *       - name: userTag
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier for the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               foodName:
 *                 type: string
 *                 description: Name of the food item
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Price of the food item
 *               qty:
 *                 type: integer
 *                 description: Quantity of the food item
 *             required:
 *               - foodName
 *               - price
 *               - qty
 *     responses:
 *       200:
 *         description: Item added to the cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item added to cart successfully
 *                 cart:
 *                   type: object
 *                   description: The updated cart object
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: userTag, foodName, price, and qty are required
 *       404:
 *         description: Cart not found for the given userTag
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cart not found for the given userTag
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 *                 error:
 *                   type: string
 *                   example: Detailed error message
 */

router.post('/:userTag/cart', controller.addToCart);


module.exports = router
