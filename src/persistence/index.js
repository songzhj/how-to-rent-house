/**
 * 持久化逻辑
 * @author songzhj
 * @license GPL-3.0
 * @Date    2017-01-12
 */
const Pretreatment = require("./pretreatment.js")
const Mongo = require("./mongo.js")

/**
 * 持久化逻辑
 * @param   {String}   mdbUrl        MongoDB服务器URL
 * @param {json} mongoSchema mongoose schema配置项（数据存储格式）
 * @param   {String}   houseSelector 房屋列表选择器
 * @param   {json}   houseOptions  房屋信息配置项
 * @return  {function}                 执行持久化回调函数
 */
function persistence(mdbUrl, mongoSchema, houseSelector, houseOptions) {
    let pretreatment = new Pretreatment(houseSelector, houseOptions);
    let mongo = new Mongo(mdbUrl);
    let today = new Date().toJSON().match(/\d{4}-\d{2}-\d{2}/)[0].replace(/-/g, "_");
    let houseModel = mongo.schema("House", mongoSchema).model("h_" + today);

    return (data) => {
        if (!data) {
            mongo.close();
            console.log("about finishing", new Date().toLocaleString());
            return;
        }
        let houseList = pretreatment.resolveData(data);
        for (let index in houseList) {
            houseModel.create(houseList[index], (err, model) => {
                if (err) {
                    console.log(err.toString());
                } else {
                    console.log("success", new Date().toLocaleString());
                }
            });
        }
    }
}

module.exports = persistence;