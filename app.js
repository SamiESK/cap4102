const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require("helmet");
const hpp = require('hpp');
const cors = require('cors');
const favicon = require('serve-favicon');


require('dotenv').config();
const port = process.env.PORT || 5000;

const AWS = require("aws-sdk");
const Orders = require('./dynamodb/config/rcm.js');

const indexRouter = require('./routes/index');
const orderRouter = require('./routes/order');

let dynamodb;

const app = express();

app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(hpp());
app.use(bodyParser.json())
app.use(cookieParser());

app.use(express.static('public'));


AWS.config.update({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_KEY,
    region: "us-east-1"
})
app.use('/api',orderRouter );


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


module.exports = app;
