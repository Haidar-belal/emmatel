const express = require('express');

const router = express.Router();

const transactionController = require('../controllers/transactionController');

const isAuth = require('../middleware/isAuthMddleware');

const isManager = require('../middleware/isManagerMddleware');


router.use(isAuth);

router.use(isManager);

router.post('/', transactionController.addTransaction);

router.put('/:id/employee', transactionController.updateTransaction);

module.exports = router;