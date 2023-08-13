const Joi = require('joi');

exports.addManager = async (req, res, next) => {
  const Schema = Joi.object({
    first_name: Joi.string()
      .min(2)
      .max(50)
      .required()
      .messages({
        'string.base': `First name should be a type of 'text'`,
        'string.empty': `First name cannot be an empty field`,
        'string.min': `First name should have a minimum length of {#limit}`,
        'string.max': `First name should have a maximum length of {#limit}`,
        'any.required': `First name is a required field`,
      }),
    last_name: Joi.string()
      .min(2)
      .max(50)
      .required()
      .messages({
        'string.base': `Last name should be a type of 'text'`,
        'string.empty': `Last name cannot be an empty field`,
        'string.min': `Last name should have a minimum length of {#limit}`,
        'string.max': `Last name should have a maximum length of {#limit}`,
        'any.required': `Last name is a required field`,
      }),
    card_id: Joi.string()
      .alphanum()
      .length(9)
      .required()
      .messages({
        'string.base': `Card ID should be a type of 'text'`,
        'string.empty': `Card ID cannot be an empty field`,
        'string.alphanum': `Card ID should only contain alpha-numeric characters`,
        'string.length': `Card ID should have a length of {#limit}`,
        'any.required': `Card ID is a required field`,
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.base': `Email should be a type of 'text'`,
        'string.empty': `Email cannot be an empty field`,
        'string.email': `Email should have a valid email format`,
        'any.required': `Email is a required field`,
      }),
    password: Joi.string()
      .min(8)
      .max(50)
      .required()
      .messages({
        'string.base': `Password should be a type of 'text'`,
        'string.empty': `Password cannot be an empty field`,
        'string.min': `Password should have a minimum length of {#limit}`,
        'string.max': `Password should have a maximum length of {#limit}`,
        'any.required': `Password is a required field`,
      }),
    phone: Joi.string()
      .pattern(new RegExp('^\\d{10}$'))
      .required()
      .messages({
        'string.base': `Phone should be a type of 'text'`,
        'string.empty': `Phone cannot be an empty field`,
        'string.pattern.base': `Phone should be a 10-digit number`,
        'any.required': `Phone is a required field`,
      }),
    city: Joi.string()
      .min(2)
      .max(50)
      .required()
      .messages({
        'string.base': `City should be a type of 'text'`,
        'string.empty': `City cannot be an empty field`,
        'string.min': `City should have a minimum length of {#limit}`,
        'string.max': `City should have a maximum length of {#limit}`,
        'any.required': `City is a required field`,
      }),
    region: Joi.string()
      .min(2)
      .max(50)
      .required()
      .messages({
        'string.base': `Region should be a type of 'text'`,
        'string.empty': `Region cannot be an empty field`,
        'string.min': `Region should have a minimum length of {#limit}`,
        'string.max': `Region should have a maximum length of {#limit}`,
        'any.required': `Region is a required field`,
      }),
    street: Joi.string()
      .min(2)
      .max(100)
      .required()
      .messages({
        'string.base': `Street should be a type of 'text'`,
        'string.empty': `Street cannot be an empty field`,
        'string.min': `Street should have a minimum length of {#limit}`,
        'string.max': `Street should have a maximum length of {#limit}`,
        'any.required': `Street is a required field`,
      }),
    near_by: Joi.string()
      .max(100)
      .allow('')
      .messages({
        'string.base': `Near by should be a type of 'text'`,
        'string.max': `Near by should have a maximum length of {#limit}`,
      }),
    manager_id: Joi.number()
      .integer()
      .required()
      .messages({
        'number.base': `Manager ID should be a type of 'number'`,
        'number.integer': `Manager ID should be an integer`,
      }),
    job_title_id: Joi.number()
      .integer()
      .required()
      .messages({
        'number.base': `Job title ID should be a type of 'number'`,
        'number.integer': `Job title ID should be an integer`,
        'any.required': `Job title ID is a required field`,
      }),
  });
  const { error } = Schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((errorDetail) => {
      return {
        path: errorDetail.path[0],
        massage: errorDetail.message
      }
    });
    return res.status(400).json({
      errors: errors
    });
  }
  next();
};