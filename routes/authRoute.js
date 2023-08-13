const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

const publicValidation = require('../validation/publicValidation');

router.post('/login', publicValidation.login, authController.login); //* routes work

module.exports = router;