const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require("helmet");
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const AWS = require("aws-sdk");
const Orders = require('./dynamodb/config/order.js');

const indexRouter = require('./routes/index');
const orderRouter = require('./routes/order');

let dynamodb;

var app = express();
app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/api',orderRouter )



AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    endpoint: process.env.ENDPOINT});

dynamodb = new AWS.DynamoDB();

app.listen(port, () => {
    console.log("Server is running");
})
module.exports = app;
