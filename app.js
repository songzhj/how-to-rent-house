const config = require("./config.js")
const Crawler = require("./src/crawler");


/*
mongoose.connect(MDB_URL);
var db = mongoose.connection;
db.on("error", () => console.log("connection err: ", "connection error"));
db.on("open", function (callback) {
    console.log("success");
});

let kittySchema = mongoose.Schema({
    _id: Number,
    name: String,
    age: Number
});

kittySchema.methods.show = function() {
    var s = this.name + " : " + this.age;
    console.log(s);
}

let Kitten = mongoose.model("cats", kittySchema);

let tom = new Kitten({_id:503006, name: "Tom", age: 4});
Kitten.findById({_id: 503006},{},{},function(err, res) {
    if (err) {
        console.log("find by id err");
    } else {
        if (res) {
            db.close();
        } else {
            console.log("break");
        }
    }
});

tom.save(function(err, tom) {
    if (err) {
        return console.log("save err: ",err.toString());
    }
    tom.show();
    db.close();
});
*/

const Pretreatment = require("./src/persistence/pretreatment.js")
let pretreatment = new Pretreatment(config.HOUSE_LIST_SELECTOR, config.HOUSE_INFO_REG);
let a = new Crawler(config.CRAWLER_URL, 1000);
a.start(pretreatment.resolveData.bind(pretreatment), config.HOUSE_LIST_REG);