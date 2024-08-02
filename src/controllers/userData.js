const { STATUS_CODES } = require('../constants');
const UserDataModel = require('../model/useData');
const UserDataRequestValidator = require('../utility/validators/userDataRequestValidator');
const {BadRequestError} = require('../utility/customErrors');
const { get } = require('lodash');

const saveUserData = async (req, res) => {
  try {
    const requestBody = req.body;
    const mobile = get(requestBody, 'mobile');
    const userName = get(requestBody, 'userName');
    const password = get(requestBody, 'password');
    const confirmPassword = get(requestBody, 'confirmPassword');
    const currentDate = new Date();

    // Validation of requestBody
    const validationErrors = UserDataRequestValidator.validateUserDataRequest(requestBody);
    
    if (Array.isArray(validationErrors) && validationErrors.length > 0) {
      throw new BadRequestError(
          'Validation failed',
          STATUS_CODES.BAD_REQUEST,
          validationErrors
      )
  }


    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      throw new BadRequestError(
        'Passwords do not match',
        STATUS_CODES.BAD_REQUEST,
        [{ field: 'confirmPassword', message: 'Passwords do not match' }]
      );
    }

    const existingMobile = await UserDataModel.findOne({ mobile: mobile });

    if (existingMobile) {
      return res.status(STATUS_CODES.OK).json({
        message: "This mobile number already exists"
      });
    }

    const usersData = new UserDataModel({
      userName: userName,
      mobile: mobile,
      password: password,
      createdAt: currentDate, // Assuming you want to store the creation date
    });

    await usersData.save();

    res.status(STATUS_CODES.CREATED).json({
      message: "UserData saved successfully"
    });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: error.message,
        errors: error.errors
      });
    }

    console.error(error);

    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error"
    });
  }
};
// POST request handler
const addToCart = async (req, res) => {
  try {
    const { userTag } = req.params; // Extract userTag from route parameters
    const { foodName, price, qty } = req.body;

    // Validate input
    if (!userTag || !foodName || !price || !qty) {
      return res.status(400).json({ message: 'userTag, foodName, price, and qty are required' });
    }

    // Calculate qtyprice
    const qtyprice = (qty * parseFloat(price)).toFixed(2);

    // Find the user data for the specific user
    let user = await UserDataModel.findOne({ userTag });

    if (!user) {
      return res.status(404).json({ message: 'User not found for the given userTag' });
    }

    // Add the new item to the user's cart items
    user.items.push({ foodName, price, qty, qtyprice });

    // Update totalAmount
    user.totalAmount = (parseFloat(user.totalAmount) + parseFloat(qtyprice)).toFixed(2);

    user.orderedAt = new Date();

    // Save the updated user data
    await user.save();

    res.status(200).json({ message: 'Item added to cart successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getUserData = async (req, res) => {
  try {
    const { mobile, password } = req.query;

    const userData = await UserDataModel.findOne({ mobile, password });

    if (!userData) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        message: "User Account Not found"
      });
    }

    return res.status(STATUS_CODES.OK).json({
      message: "User Account found Successfully",
      data: userData
    });
  } catch (error) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
      error
    });
  }
};

// DELETE request handler
const removeFromCart = async (req, res) => {
  try {
    const { userTag } = req.params; // Extract userTag from route parameters
    const { foodName } = req.body;

    // Validate input
    if (!userTag || !foodName) {
      return res.status(400).json({ message: 'userTag and foodName are required' });
    }

    // Find the user data for the specific user
    let user = await UserDataModel.findOne({ userTag });

    if (!user) {
      return res.status(404).json({ message: 'User not found for the given userTag' });
    }

    // Find the item to be removed
    const itemIndex = user.items.findIndex(item => item.foodName === foodName);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in the cart' });
    }

    // Calculate the qtyprice of the item to be removed
    const qtyprice = parseFloat(user.items[itemIndex].qtyprice);

    // Remove the item from the user's cart items
    user.items.splice(itemIndex, 1);

    // Update totalAmount
    user.totalAmount = (parseFloat(user.totalAmount) - qtyprice).toFixed(2);

    // Update orderedAt
    user.orderedAt = new Date();

    // Save the updated user data
    await user.save();

    res.status(200).json({ message: 'Item removed from cart successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


module.exports = {
  saveUserData,
  addToCart,
  getUserData,
  removeFromCart
};
