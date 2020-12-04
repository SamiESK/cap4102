const bcrypt = require("bcryptjs");

class arts {

    constructor(email, date, phone, pickup, dropOff, name, description)
    {
        this.table = "art";
        this.email = email;
        this.name = name;
        this.id = 0;
        this.date = date;
        this.phone = phone;
        this.pickup = pickup;
        this.dropOff = dropOff;
        this.description = description;
    }

}

module.exports = arts;