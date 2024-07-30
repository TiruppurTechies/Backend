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

module.exports = {
  saveUserData
};
