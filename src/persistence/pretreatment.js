/**
 * 数据预处理，将html匹配为需要的数据
 * @author songzhj
 * @license GPL-3.0
 * @Date    2017-01-12
 */
const cheerio = require("cheerio");

class Pretreatment {
    constructor(houseListSelector, options) {
        this.houseListSelector = houseListSelector;
        this.options = options;
        this.$ = null;
        this.TYPE = {
            "attr": this.handleAttr,
            "text": this.handleText,
            "array": this.handleArray
        };
    }

    resolveData(data) {
        this.$ = cheerio.load(data[0]);
        let resData = {};
        resData.houses = [];
        let $ = this.$;
        let $li = $(this.houseListSelector);
        $li.each((index, ele) => {
            let house = {};
            let options = this.options;
            let $house = $(ele);
            for (let item in options) {
                let type = options[item].type;
                house[item] = this.TYPE[type].bind(this)($house, options[item]);
            }
            console.log(house);
            resData.houses.push(house);
        });
        return resData;
    }

    handleAttr(data, {name:selector, reg:regex, attr:attr}) {
        let res = data.find(selector).attr(attr).match(regex);
        return res ? res[0] : "";
    }

    handleText(data, {name:selector, reg:regex, attr:attr}) {
        let res = data.find(selector).text().match(regex);
        return res ? res[0] : "";
    }

    handleArray(data, {name:selector, reg:regex, attr:attr}) {
        let res = [];
        data.find(selector).each((index, ele) => {
            let item = this.$(ele).text().match(regex);
            res.push(item ? item[0] : "");
        });
        return res;
    }
}

module.exports = Pretreatment;