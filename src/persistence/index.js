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
    let mongo = new Mongo(mdbUrl, 150);
    let today = new Date().toLocaleString().match(/\d{4}-\d{2}-\d{2}/)[0].replace(/-/g, "_");
    mongo.schema(mongoSchema)
    mongo.model("h_" + today);

    return (data, ...otherInfo) => {
        if (!data) {
            closeDelay = setTimeout(() => {
                mongo.close();
                console.log("[[about finishing]]: ", new Date().toLocaleString(), otherInfo[0], data);
            }, 30 * 1000);
            return;
        }
        if (closeDelay) {
            clearTimeout(closeDelay);
            closeDelay = null;
        }
        let houseList = pretreatment.resolveData(data).houses;
        let isSaved = mongo.save(houseList.concat(lastData));
        if (isSaved) {
            console.log("[Crawler]: ", new Date().toLocaleString(), otherInfo[0]);
            return true;
        } else {
            console.log("[CachePool Full]: waiting", lastData.length());
            lastData = lastData.concat(houseList);
            return false;
        }
    }
}
//私有
let closeDelay = null;
let lastData = [];

module.exports = persistence;