/**
 * 房源推荐系统模块
 * @author songzhj
 * @license GPL-3.0
 * @Date    2017-05-04
 */
const Recommend = require('./recommend');
const Mail = require('./mail');
const personalConfig = require('./personalConfig');

class RecommendSys {
    constructor() {
        this.mail = new Mail();
        this.recommend = new Recommend();
        this.resultCachePool = {};
        this.init();
    }

    init() {
        for (let i in personalConfig) {
            this.resultCachePool[personalConfig[i].key] = [];
        }
    }

    async run(house) {
        let resultList = await this.recommend.match(house, personalConfig);
        console.log(resultList);
        for (let i in resultList) {
            let key = resultList[i].person.key;
            this.resultCachePool[key].push(resultList[i]);
            if (this.resultCachePool[key].length >= 2) {
                this.mail.send(this.resultCachePool[key], house);
                this.resultCachePool[key] = [];
            }
        }
    }
}

module.exports = RecommendSys;