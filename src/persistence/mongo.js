/**
 * mongodb模块，处理数据的持久化
 * @author songzhj
 * @license GPL-3.0
 * @Date    2017-01-12
 */
const mongoose = require("mongoose");

class Mongo {
    /**
     * @param   {String}   url 数据库连接url
     */
    constructor(url) {
        mongoose.connect(url);
        this.db = mongoose.connection;
    }

    close() {
        this.db.close();
    }

    schema(name, schema) {
        let _name = name + "SCHEMA";
        if (schema) {
            this[_name] = mongoose.Schema(schema);
            this[_name].model = (collectionName) => _model.bind(this)(collectionName, this[_name]);
            return this[_name];        
        } else {
            return this[_name];
        }
    }

    model(collectionName) {
        let _name = collectionName + "MODEL";
        return this[_name];
    }

}
//私有
function _model(collectionName, schema) {
    let _name = collectionName + "MODEL";
    this[_name] = mongoose.model(collectionName, schema);
    return this[_name];
}

module.exports = Mongo;