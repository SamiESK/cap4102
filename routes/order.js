var express = require('express');
var router = express.Router();
const {body, validationResult} = require('express-validator');
const AWS = require('aws-sdk');
const Orders = require("../dynamodb/config/order");

router.get('/orders/:orderId', function(req, res, next) {
    const docClient = new AWS.DynamoDB.DocumentClient();
    let params = {
        TableName: "Orders",
        Key: {
            'id': req.params.orderId,
        }
    }


    // Call DynamoDB to add the item to the table
    docClient.get(params, function (err, data) {
        if (err) {
            res.send({
                success: false,
                message: err
            }).status(400);
        } else {
            res.send({
                success: true,
                data: data.Item,
                movie: data
            }).status(200);
        }
    }).catch((err) => {
        return res.status(500).send(err);
    })

});

router.post('/orders',  [
    body('name').trim().escape(),
    body('email').trim().escape().normalizeEmail(),
    body('phone').trim().escape().toInt(),
    body('smallBox').trim().escape().toInt(),
    body('mediumBox').trim().escape().toInt(),
    body('largeBox').trim().escape().toInt(),
    body('dishBox').trim().escape().toInt(),
    body('wardrobeBox').trim().escape().toInt(),
    body('packagingPaper').trim().escape().toInt(),
    body('tape55').trim().escape().toInt(),
    body('tape110').trim().escape().toInt(),
    body('shrinkWrap').trim().escape().toInt(),

    ],
    function(req, res, next) {
    console.log(req.body);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, smallBox, mediumBox, largeBox, dishBox, wardrobeBox, pictureBox,
            packagingPaper, tape55, tape110, shrinkWrap} = req.body;

    var temp = new Orders(email, smallBox, mediumBox, largeBox, dishBox, pictureBox,wardrobeBox, packagingPaper, tape55,tape110, shrinkWrap);

        bcrypt.hash(temp.email , 7, function (err, hash) {
            temp.id = hash;
            params = {TableName: temp.table,
                Item: temp}

            docClient.put(params, function(err, data) {
                if (err) {
                    console.error("Unable to add movie");
                    console.log(err);
                } else {
                    console.log("PutItem succeeded:");
                }
            });
        })

});

router.put('/orders/:orderId', function(req, res, next) {
    const docClient = new AWS.DynamoDB.DocumentClient();

});

router.delete('/orders/:orderId', function(req, res, next) {
    const docClient = new AWS.DynamoDB.DocumentClient();
    console.log()
    var params = {
        Key: {
            'id': req.params.orderId,
        },
        TableName: 'Orders'
    };

    docClient.delete(params, function(err, data) {
        if (err) {
            return res.status(400).send();
        } else {
            return res.status(200).send({success: true, msg: `deleted order: ${req.params.orderId}`});
        }
    });
});

module.exports = router;
