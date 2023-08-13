const { Manager, Employee } = require('../models');
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

exports.getValidationErrors = (error) => {
    const validationErrors = error.errors.filter((e) => e.type === 'Validation error' || e.type === 'unique violation' || e.type === 'notNull Violation');
    return validationErrors ? validationErrors.map((e) => e.message) : error;
};

exports.checkIsPasswordMatch = async (old_password, new_password) => {
    try {
        const isPasswordMatch = await bcrypt.compare(old_password, new_password);
        return isPasswordMatch;
    } catch (error) {
        throw error;
    }
};

exports.generateToken = (user) => {
    try {
        const token = jwt.sign({ id: user.id.toString(), email: user.email, password: user.password, role: user.job_title.name }, process.env.SECRET_KEY, {
            expiresIn: "10h",
        });
        return token;
    } catch (error) {
        throw error;
    }
};

exports.checkIfManagerExists = async (email) => {
    try {
        const manager = await Manager.findOne({ where: { email }, include: 'job_title' });
        return manager;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.checkIfEmployeeExists = async (email) => {
    try {
        const employee = await Employee.findOne({ where: { email }, include: 'job_title' });
        return employee;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.createTransport = async (email, code) => {
    // node mailer setting
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.SEND_EMAILS_PASSWORD
        }
    });
    const info = await transporter.sendMail({
        from: 'emmatel@gmail.com',
        to: email,
        subject: 'Password reset code',
        text: `Your password reset code is ${code}`
    });
    return info;
};

exports.resetPassword = async (user, password) => {
    try {
        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword;
        user.reset_password = null;
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};