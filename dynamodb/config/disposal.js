const bcrypt = require("bcryptjs");

class disposal {

    constructor(email, date, phone, pickup, name, description)
    {
        this.table = "Orders";
        this.email = email;
        this.name = name;
        this.id = bcrypt.hash(email).then(data => data);
        this.date = date;
        this.phone = phone;
        this.pickup = pickup;
        this.description = description;
    }

}

module.exports = disposal;