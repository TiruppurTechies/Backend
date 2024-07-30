const Joi = require('joi')

class UserDataRequestValidator {
    static validateUserDataRequest(requestBody) {
        const schema = Joi.object({
            userName: Joi.string().required(),
            mobile: Joi.string().required().pattern(/^\d{10}$/).messages({
                'string.pattern.base': 'Number must be a 10-digit number.',
            }),
            password: Joi.string().required().min(8),
            confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
                'any.only': 'Confirm Password must match Password',
            })
        });

           // Validate the request body against the schema
           const { error } = schema.validate(requestBody, {
            abortEarly: false,
        })

        // Return validation result
        return error ? error.details.map((err) => err.message) : []
    }
}

module.exports = UserDataRequestValidator;
