/*!
 * 爬虫模块
 * @author songzhj
 * @license  GPL-3.0
 * @Date 2017-01-12
 */
const http = require("http");

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

    httpRequest(url, regex, callback) {
        http.get(url, (res) => {
            let page = "";
            res.setEncoding("utf-8");
            res.on("data", (chunk) => {
                page += chunk;
            });
            res.on("end", () => {
                let house = page.match(regex);
                if (house) {
                    callback(house);
                } else {
                    this.isFinish = true;
                }
            })
        });
    }

    start(callback, regex = /[\s\S]*/) {
        let url = this.url;
        let dida = () => {
            if (this.isFinish) return;
            this.httpRequest(url + this.index, regex, callback);
            ++this.index;
            setTimeout(dida, this.intervalTime);
        }
        dida(this.index);
    }
}

module.exports = Crawler;