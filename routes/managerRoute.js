const express = require('express');

const router = express.Router();

const isAuth = require('../middleware/isAuthMddleware');

const isManager = require('../middleware/isManagerMddleware');

const managerController = require('../controllers/ManagerController');

const publicValidation = require('../validation/publicValidation');

const managerValidation = require('../validation/managerValidation');

router.use(isAuth);

router.use(isManager)

router.get('/',managerController.getAllManagers);

router.get('/job-titles', managerController.getJobTitle);

router.post('/signup', managerValidation.addManager, managerController.addManager);

router.post('/forgot-password', publicValidation.forgetPassword, managerController.forgetPassword);

router.post('/reset-password', publicValidation.resetPassword, managerController.resetPassword);

router.post('/change-password', publicValidation.changePassword, managerController.changePassword);

module.exports = router;