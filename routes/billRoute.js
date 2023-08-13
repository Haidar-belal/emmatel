const express = require('express');

const router = express.Router();

const billController = require('../controllers/billController');

const isAuth = require('../middleware/isAuthMddleware');

const isManager = require('../middleware/isManagerMddleware');

router.use(isAuth);

router.use(isManager);

router.get('/', billController.getAllBills);  //* routes works 

router.get('/:id', billController.getOneBill);  //* routes works 


module.exports = router;