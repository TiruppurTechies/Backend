const express = require('express');
const router = express.Router();
const controller = require('../controllers/menuItems')

/**
 * @swagger
 * tags:
 *   name: MenuItems
 *   description: API endpoints for managing menuitems
 */

/**
 * @swagger
 * /menuItems:
 *   get:
 *     summary: Get all menu items
 *     description: Endpoint to retrive all menu items
 *     tags: [MenuItems]
 *     responses:
 *       200:
 *          description: MenuItems found successfully
 *       500:
 *         description: Internal server error
 */

router.get('/',controller.getAllMenuItems)


/**
 * @swagger
 * /menuItems/veg:
 *   get:
 *     summary: Get Veg menu items
 *     description: Endpoint to retrive all Veg menu items
 *     tags: [MenuItems]
 *     responses:
 *       200:
 *          description: Veg MenuItems found successfully
 *       500:
 *         description: Internal server error
 */

 router.get('/veg',controller.getVegMenuItems)
 
/**
 * @swagger
 * /menuItems/nonVeg:
 *   get:
 *     summary: Get NonVeg menu items
 *     description: Endpoint to retrive all Nonveg menu items
 *     tags: [MenuItems]
 *     responses:
 *       200:
 *          description: NonVeg MenuItems found successfully
 *       500:
 *         description: Internal server error
 */

 router.get('/nonVeg',controller.getNonVegMenuItems)

 
/**
 * @swagger
 * /menuItems/special:
 *   get:
 *     summary: Get Special menu items
 *     description: Endpoint to retrive all special menu items
 *     tags: [MenuItems]
 *     responses:
 *       200:
 *          description: Special MenuItems found successfully
 *       500:
 *         description: Internal server error
 */

 router.get('/special',controller.getSpecialMenuItems);

module.exports = router;
