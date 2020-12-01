const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require("helmet");
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


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


module.exports = app;
