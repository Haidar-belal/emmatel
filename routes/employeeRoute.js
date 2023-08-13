const express = require('express');

const router = express.Router();

const isAuth = require('../middleware/isAuthMddleware');

const isManager = require('../middleware/isManagerMddleware');

const employeeController = require('../controllers/employeeController');

const employeeValidation = require('../validation/employeeValidation');

const publicValidation = require('../validation/publicValidation');


router.use(isAuth);

router.put('/:id', employeeController.updateEmployee); //todo make validations to this route

router.post('/change-password', publicValidation.changePassword, employeeController.changePassword);

router.post('/forgot-password', publicValidation.forgetPassword, employeeController.forgetPassword);

router.post('/reset-password', publicValidation.resetPassword, employeeController.resetPassword);

router.use(isManager);

router.post('/', employeeValidation.addEmployee, employeeController.addEmployee);  //* routes work

router.delete('/:id', employeeController.deleteEmployee); //* routes work

router.get('/:id', employeeController.getOneEmployee); //* route work

router.get('/', employeeController.getAllEmployeesForOneManager); //* routes work


module.exports = router;