const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { sequelize } = require('./models');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes/authRoute'));
app.use('/managers', require('./routes/managerRoute'));
app.use('/employees', require('./routes/employeeRoute'));
app.use('/bills', require('./routes/billRoute'));
app.use('/transactions', require('./routes/transactionRoute'));
app.use('/company-branchs', require('./routes/companyBranchRoute'));
app.use('/targets', require('./routes/targetRoute'));


app.listen(3000, async () => {
    // await sequelize.sync();
    await sequelize.authenticate();
    console.log("Server started on port 3000");
});



// const crypto = require('crypto');
// const secret = crypto.randomBytes(256).toString('hex');
// console.log(secret);