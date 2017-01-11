const config = require("../../config");
const http = require("http");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

const URL = config.CRAWLER_URL;
const MDB_URL = config.MDB_URL;
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

// let $ = cheerio.load(house[0]);
// let $price = $(".price");
// $price.each(function(index, ele) {
//     console.log($(this).text().match(/\d+/)[0]);
// })

/**
 * 爬虫类，单例
 */
class Crawler {
    /**
     * 构造函数，单例模式
     * @param  {String} url       爬取目标url
     * @param  {Number} pageStart 开始页
     */
    constructor(url, pageStart = 0) {
        if (!url) return;
        if (Crawler.instance) {
            return Crawler.instance;
        } else {
            let instance = new Crawler();
            Crawler.instance = instance;
            instance.url = url;
            instance.pageStart = pageStart;
            instance.index = pageStart;
            instance.isFinish = false;
            instance.intervalTime = 1000;
            return instance;
        }
    }

    set intervalTime (intervalTime) {
        if (Number.isInteger(intervalTime)) {
            this._intervalTime = intervalTime;
        }
    }

    get intervalTime () {
        return this._intervalTime;
    }

    httpRequest(url, callback) {
        http.get(url, (res) => {
            let page = "";
            res.setEncoding("utf-8");
            res.on("data", (chunk) => {
                page += chunk;
            });
            res.on("end", () => {
                let house = page.match(config.HOUSE_LIST_REG);
                if (house) {
                    callback(house[0]);
                } else {
                    this.isFinish = true;
                }
            })
        });
    }

    start(callback) {
        let url = this.url;
        let dida = () => {
            if (this.isFinish) return;
            this.httpRequest(url + this.index, callback);
            ++this.index;
            setTimeout(dida, this.intervalTime);
        }
        dida(this.index);
    }
}

let a = new Crawler(config.CRAWLER_URL, 750);
a.start(handleData);

function handleData(data) {
    let $ = cheerio.load(data);
    let $price = $(".price");
    $price.each(function(index, ele) {
        console.log($(this).text().match(/\d+/)[0]);
    })
}