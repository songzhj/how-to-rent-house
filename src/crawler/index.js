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
    constructor(url, pageStart = 1, minPageEnd = Number.MAX_VALUE) {
        if (!url) return;
        if (Crawler.instance) {
            return Crawler.instance;
        } else {
            let instance = new Crawler();
            Crawler.instance = instance;
            instance.url = url;
            instance.pageStart = pageStart;
            instance.minPageEnd = minPageEnd;
            instance.index = pageStart;
            instance.isFinish = false;
            instance.intervalTime = 1000;
            instance.failedTime = 1;
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
                if (page) {
                    let pageJson = JSON.parse(page);
                    if (!callback(pageJson, url)) {
                        console.log("[callback false]:", this.failedTime);
                        this.isFinish = true;
                        setTimeout(() => {
                            this.isFinish = false;
                            dida.bind(this)(callback, regex);
                        }, this.failedTime * (this.intervalTime + 1000));
                        this.failedTime *= 2;
                        return;
                    }
                    this.failedTime = 1;
                } else {
                    this.isFinish = this.index > this.minPageEnd;
                    if (this.Finish) {
                        callback(null, url);
                    } else {
                        --this.index;
                    }
                }
            })
        }).on("error", (err) => {
            --this.index;
            console.log("[httpRequest Expection]:", "page Index=" + this.index, err.toString());
        });
    }

    start(callback, regex = /[\s\S]*/) {
        dida.bind(this)(callback, regex);
    }
}
//私有
function dida(callback, regex) {
    console.log("[dida]: index ", this.index, this.isFinish);
    if (this.isFinish) return;
    this.httpRequest(this.url + this.index, regex, callback);
    ++this.index;
    let human = this.index % 10 === 0 ? 30000 : 0;
    setTimeout(dida.bind(this, callback, regex), this.intervalTime + human);
}

module.exports = Crawler;