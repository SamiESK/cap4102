const bcrypt = require("bcryptjs");

class packing {

    constructor(email, date, phone, pickup, dropOff, name, preference)
    {
        this.table = "Orders";
        this.email = email;
        this.name = name;
        this.id = bcrypt.hash(email).then(data => data);
        this.date = date;
        this.phone = phone;
        this.pickup = pickup;
        this.dropOff = dropOff;
        this.preference = preference;
    }

}

module.exports = packing;