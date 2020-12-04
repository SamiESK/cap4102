const bcrypt = require("bcryptjs");

class piano {

    constructor(email, date, phone, pickup, dropOff, name, pianoNum)
    {
        this.table = "Orders";
        this.email = email;
        this.name = name;
        this.id = bcrypt.hash(email).then(data => data);
        this.date = date;
        this.phone = phone;
        this.pickup = pickup;
        this.dropOff = dropOff;
        this.pianoNum = pianoNum;
    }

}

module.exports = piano;