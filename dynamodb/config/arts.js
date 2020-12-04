const bcrypt = require("bcryptjs");

class arts {

    constructor(email, date, phone, pickup, dropOff, name, description, preference)
    {
        this.table = "art";
        this.email = email;
        this.name = name;
        this.id = bcrypt.hash(email).then(data => data);
        this.date = date;
        this.phone = phone;
        this.pickup = pickup;
        this.dropOff = dropOff;
        this.description = description;
    }

}

module.exports = arts;