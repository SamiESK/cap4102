var express = require('express');
var router = express.Router();
const {body, validationResult} = require('express-validator');
const AWS = require('aws-sdk');
const Orders = require("../dynamodb/config/rcm");
const art_order = require("../dynamodb/config/arts");
const bcrypt = require('bcryptjs');

AWS.config.update({
    accessKeyId: "AKIAUMEBK5A3I4OLLV63",
    secretAccessKey:"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",
    region: "us-east-1"
})

const docClient = new AWS.DynamoDB.DocumentClient();

router.get('/orders/:orderId', function(req, res, next) {

    let params = {
        TableName: "rcm",
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
            }).status(200);
        }
    });

});

router.post('/orders/rcm',  [
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
                    res.status(400).send({error: "please try again later"})
                } else {
                    console.log("PutItem succeeded:");


                }
            });
        })

});

// piano

router.post('/orders/art',  [
        body('name').trim().escape(),
        body('email').trim().escape().normalizeEmail(),
        body('phone').trim().escape().toInt(),
        body('dropOff').trim().escape(),
        body('pickUp').trim().escape(),
        body('date').escape().toDate(),
        body('ArtComment').trim().escape(),
    ],
    function(req, res, next) {
        console.log(req.body);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {email, name, phone, pickUp, dropOff, ArtComment, date} = req.body;

         var temp = new art_order(email, date, phone, pickUp, dropOff, name, ArtComment);
         console.log(temp.email);
        bcrypt.hash(temp.email , 7, function (err, hash) {
            temp.id = hash;
            params = {TableName: temp.table,
                Item: temp}

            docClient.put(params, function(err, data) {
                if (err) {
                    console.error("Unable to add movie");
                    res.status(400).send({error: "please try again later"})
                } else {
                    console.log("PutItem succeeded:");
                    res.status(200).send({success: "created order"});
                }
            });
        })

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
