/**
 * how-to-rent-house收集数据部分程序
 * @author songzhj
 * @license GPL-3.0
 * @Date    2017-01-14
 */
const config = require("./config.js")
const Crawler = require("./src/crawler");
const persistence = require("./src/persistence");

function app(startPage = 1, minEndPage = Number.MAX_VALUE) {
    let crawler = new Crawler(config.CRAWLER_URL, startPage, minEndPage);
    crawler.intervalTime = 10 * 1000;
    let persistenceCallback = persistence(config.MDB_URL,
                                                                config.MONGO_SCHEMA);
    crawler.start(persistenceCallback, config.HOUSE_LIST_REG);
}

module.exports = app;