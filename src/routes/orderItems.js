const express = require('express')
const router = express.Router()
const controller = require('../controllers/orderItems')

/**
 * @swagger
 * /orderItems/{userTag}:
 *   post:
 *     summary: Update order items and store them in a separate collection
 *     tags: [Orders]
 *     parameters:
 *       - name: userTag
 *         in: path
 *         required: true
 *         description: Tag of the user whose order is being updated
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentMethods:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of payment methods used for the order
 *     responses:
 *       200:
 *         description: Order items updated and saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OrderItems Update Successfully
 *       404:
 *         description: User account not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Account Not Found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 error:
 *                   type: object
 */

router.post('/:userTag',controller.updateOrderItems)

module.exports = router