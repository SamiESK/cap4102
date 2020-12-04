const bcrypt = require("bcryptjs");

class assembly {

    constructor(email, date, phone, pickup, name, description, preference)
    {
        this.table = "furnAssembly";
        this.email = email;
        this.name = name;
        this.id = bcrypt.hash(email).then(data => data);
        this.date = date;
        this.phone = phone;
        this.pickup = pickup;
        this.preference = preference;
        this.description = description;
    }

}

module.exports = assembly;