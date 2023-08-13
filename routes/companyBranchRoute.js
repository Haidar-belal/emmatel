const express = require('express');

const router = express.Router();

const companyBranchController = require('../controllers/companyBranchController');

const isAuth = require('../middleware/isAuthMddleware');

const isManager = require('../middleware/isManagerMddleware');

router.use(isAuth);

router.use(isManager);

router.get('/', companyBranchController.getAllCompanyBranch); //* routes work

module.exports = router;