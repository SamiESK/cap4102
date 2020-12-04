const bcrypt = require("bcryptjs");

class contact {

    constructor(email, phone, name, questions)
    {
        this.table = "contact";
        this.email = email;
        this.name = name;
        this.id = bcrypt.hash(email).then(data => data);
        this.phone = phone;
        this.questions = questions;

    }

}

module.exports = contact;