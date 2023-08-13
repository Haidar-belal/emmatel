const express = require('express');

const router = express.Router();

const targetController = require('../controllers/targetController');

router.get('/', targetController.getAllTarget); //* routes work

module.exports = router;