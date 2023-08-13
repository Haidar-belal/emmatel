const { Manager, JobTitle } = require('../models');
const { addManager, checkIfManagerExistsUsingCode, changePassword } = require('../helpers/managerHelper');
const { checkIfEmployeeExists, getValidationErrors, checkIsPasswordMatch, generateToken, checkIfManagerExists, createTransport, resetPassword } = require('../helpers/publicHelper');


//* Endpoint for get all managers
exports.getAllManagers = async (req, res, next) => {
    try {
        const managers = await Manager.findAll({
            include: 'job_title'
        });
        return res.status(200).json(managers);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

//* Endpoint for get one manager
exports.getOneManager = async (req, res, next) => {
    try {
        const manager = await Manager.findOne({
            where: {
                id: req.params.id
            },
            include: 'job_title'
        });
        return res.status(200).json(manager);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

//* Endpoint for get job titles
exports.getJobTitle = async (req, res, next) => {
    try {
        const jobTitles = await JobTitle.findAll();
        return res.status(200).json(jobTitles);
    } catch (error) {
        return res.status(500).json(error.massage);
    }
};

//* Endpoint for signing up
exports.addManager = async (req, res, next) => {
    try {
        const employeeExests = await checkIfEmployeeExists(req.body.email)
        if (employeeExests) {
            return res.status(400).json({ error: "Email already exist" })
        }
        const manager = await addManager(req.body);
        res.status(200).json({ message: "Signup successful", manager });
    } catch (error) {
        const validationErrors = getValidationErrors(error);
        res.status(500).json({ error: validationErrors || error });
    }
};

//* Endpoint for change password
exports.changePassword = async (req, res, next) => {
    const { new_password, old_password } = req.body;
    try {
        const isPasswordMatch = await checkIsPasswordMatch(old_password, new_password);
        if (!isPasswordMatch) {
            return res.status(400).json({ error: "Incorrect password" });
        }
        const manager = await changePassword(new_password, req.user.id)
        const token = generateToken(manager);
        return res.status(200).json({
            token: token,
            user: manager
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//* Endpoint for forget password
exports.forgetPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const manager = await checkIfManagerExists(email);
        if (!manager) {
            return res.status(404).json({ error: 'No user found with that email address' });
        }
        const code = crypto.randomBytes(3).toString('hex');
        manager.reset_password = code;
        await manager.save();
        let info = await createTransport(manager.email, code);
        return res.status(200).json({ massage: 'Password reset code sent to your email' });
    } catch (error) {
        return res.status(500).json({ error: error.massage });
    }
};

//* Endpoint for reset password
exports.resetPassword = async (req, res, next) => {
    const { code, new_password } = req.body;
    try {
        const manager = await checkIfManagerExistsUsingCode(code);
        if (!manager) {
            return res.status(404).json({ error: 'Invalid or expired password reset code' });
        }
        const newManager = await resetPassword(manager, new_password);
        const token = generateToken(newManager);
        return res.status(200).json({
            token: token,
            user: manager
        });
    } catch (error) {
        return res.status(500).json({ error: error.massage });
    }
};