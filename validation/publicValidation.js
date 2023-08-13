const Joi = require('joi');

exports.changePassword = async (req, res, next) => {
    const Schema = Joi.object({
        old_password: Joi.string().min(8).max(30).required().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?;:|]+$')),
        new_password: Joi.string().min(8).max(30).required().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?;:|]+$')),
        confirm_password: Joi.string()
            .required()
            .valid(Joi.ref('new_password'))
            .label('confirm_password')
            .messages({ 'any.only': '{{#label}} does not match' }),
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
exports.forgetPassword = async (req, res, next) => {
    const Schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required()
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
exports.resetPassword = async (req, res, next) => {
    const Schema = Joi.object({
        code: Joi.string().alphanum().min(6).max(6).required().label('code'),
        new_password: Joi.string().min(8).max(30).required().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?;:|]+$'))
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

exports.login = async (req, res, next) => {
    const Schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        type: Joi.string().required(),
        password: Joi.string().min(8).max(30).required().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?;:|]+$')),
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

