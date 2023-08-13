require('dotenv').config();
const { checkIfManagerExists, checkIfEmployeeExists, generateToken, checkIsPasswordMatch } = require('../helpers/publicHelper');

//* Endpoint for logging in
exports.login = async (req, res, next) => {
    const { email, password, type } = req.body;
    let user;
    try {
        if (type === 'manager') {
            user = await checkIfManagerExists(email);
        } else {
            user = await checkIfEmployeeExists(email);
        }
        if (!user) {
            return res.status(400).send({ error: "Email not found" });
        }
        const isPasswordMatch = await checkIsPasswordMatch(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ error: "Incorrect password" });
        }
        const token = generateToken(user);
        return res.status(200).json({
            token: token,
            user: user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


