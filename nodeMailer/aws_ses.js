const AWS = require('aws-sdk');
const Handlebars = require("handlebars");
const path = require('path');

function sendConfirmationEmail(data) {

    let emailHtml = Handlebars.compile(path.resolve(__dirname, 'template/confirmation.html'));
    emailHtml({
        user_name: data.name,
        orderId: data.orderId,
    });
    var params = {
        Destination: { /* required */

            ToAddresses: [
                data.email
                /* more items */
            ]
        },
        Message: { /* required */
            Body: { /* required */
                Html: {
                    Charset: "UTF-8",
                    Data: emailHtml
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Confirmation for Village Moving Service'
            }
        },
        Source: 'SENDER_EMAIL_ADDRESS', /* required */

    };

// Create the promise and SES service object
    var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

// Handle promise's fulfilled/rejected states
    sendPromise.then(
        function(data) {
            console.log(data.MessageId);
            return true;
        }).catch(
        function(err) {
            console.error(err, err.stack);
            return false;
        });
}