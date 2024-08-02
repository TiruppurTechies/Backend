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
 *       201:
 *         description: UserData saved successfully
 *       400:
 *         description: Bad request error
 *       500:
 *         description: Internal server error
 */

router.post('/', controller.saveUserData)

/**
 * @swagger
 * /userData/:
 *   get:
 *     summary: Get user data by mobile and password
 *     tags: [UserData]
 *     parameters:
 *       - in: query
 *         name: mobile
 *         schema:
 *           type: string
 *         required: true
 *         description: Mobile number of the user
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description: Password created by the user
 *     responses:
 *       200:
 *         description: User account found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Account found Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     mobile:
 *                       type: string
 *                     password:
 *                       type: string
 *       404:
 *         description: User account not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Account Not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 *                 error:
 *                   type: object
 */
router.get('/',controller.getUserData);

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
/**
 * @swagger
 * /userData/cart/{userTag}:
 *   delete:
 *     summary: Remove an item from the user's cart
 *     description: Removes a specified item from the user's cart based on the provided userTag and foodName.
 *     tags: [UserData]
 *     parameters:
 *       - in: path
 *         name: userTag
 *         required: true
 *         description: The tag of the user whose cart item is to be removed
 *         schema:
 *           type: string
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
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item removed from cart successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     userTag:
 *                       type: string
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           foodName:
 *                             type: string
 *                           qtyprice:
 *                             type: string
 *                           qty:
 *                             type: number
 *                     totalAmount:
 *                       type: string
 *                     orderedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: userTag and foodName are required
 *       404:
 *         description: User or item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found for the given userTag
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 *                 error:
 *                   type: object
 */

router.delete('/cart/:userTag',controller.removeFromCart);


module.exports = router
