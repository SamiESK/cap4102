const bcrypt = require("bcryptjs");

class Rcm {

    constructor(email, date ,smallBox = 0, mediumBox = 0, largeBox = 0, dishBox = 0,
                pictureBox = 0, wardrobeBox = 0, packingPaper = 0, tape55 = 0,
                tape110 =0, shrinkWraper = 0, other = "")
    {
        this.smallBox = smallBox;
        this.mediumBox = mediumBox;
        this.largeBox = largeBox;
        this.dishBox = dishBox;
        this.pictureBox = pictureBox;
        this.wardrobeBox = wardrobeBox;
        this.packingPaper = packingPaper;
        this.tape55 = tape55;
        this.tape110 =tape110;
        this.shrinkWrap = shrinkWraper;
        this.other = other;
        this.table = "Orders";
        this.email = email;
        this.name = "";
        this.id = bcrypt.hash(email).then(data => data);
        this.date = date;
    }

}

module.exports = Rcm;