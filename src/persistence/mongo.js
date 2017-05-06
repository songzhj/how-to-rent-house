/**
 * mongodb模块，处理数据的持久化
 * @author songzhj
 * @license GPL-3.0
 * @Date    2017-01-12
 */
const mongoose = require("mongoose");
const CachePool = require("./cachePool.js");
const RecommendSys = require("../recommend/index");

class Mongo {
    /**
     * @param   {String}   url 数据库连接url
     */
    constructor(url, maxSize) {
        this.url = url;
        this.cachePool = new CachePool(maxSize);
        mongoose.connect(url);
        this.db = mongoose.connection;
        this.db.on("open", () => {console.log("[Mongo open]"); isConnection = true; mongoSave.bind(this)();});
        this.db.on("error", (err) => {mongoError.bind(this)(err);});
    }

    close() {
        let intervalClose = () => {
            if (this.cachePool.size === 0) {
                this.db.close();
                return;
            }
            setTimeout(intervalClose, 5000);
        }
        intervalClose();
    }

    schema(schema) {
        if (schema) {
            this.schema = mongoose.Schema(schema);
        }
        return this.schema;
    }

    model(collectionName) {
        if (collectionName) {
            this.model = mongoose.model(collectionName, this.schema);
        }
        return this.model;
    }

    save(data) {
        if (this.cachePool.size === 0) {
            setTimeout(mongoSave.bind(this), 2000);
        }
        return this.cachePool.add(data);
    }

}
//私有
let isConnection = false; //连接锁
let recommendSys = new RecommendSys();
function mongoSave() {
    let model = this.model;
    let cache = this.cachePool;
    let saveData;
    let writeToDB = () => {
        if (isConnection && (saveData = cache.out())) {
            model.create(saveData, (err, model) => {
                if (err) {
                    console.log("[create error]: ", err.errmsg);
                } else {
                    console.log("[success]: ", new Date().toJSON());
                    recommendSys.run(saveData);
                }
            });
            setTimeout(writeToDB, 400);
        }
    }
    setTimeout(writeToDB, 0);
}
function mongoError(err) {
    isConnection = false;
    console.log("[MongoError]: ", new Date().toJSON(), ": " + err.toString());
    this.db.close();
    setTimeout(() => {
        mongoose.connect(this.url);
    }, 100);
}
module.exports = Mongo;