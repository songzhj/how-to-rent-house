const config = require("./config.js")
const Crawler = require("./src/crawler");
const persistence = require("./src/persistence");

function app() {
    let crawler = new Crawler(config.CRAWLER_URL);
    crawler.intervalTime = 10 * 1000;
    let persistenceCallback = persistence(config.MDB_URL,
                                                                config.MONGO_SCHEMA,
                                                                config.HOUSE_LIST_ITEM_SELECTOR,
                                                                config.HOUSE_INFO_REG);
    crawler.start(persistenceCallback, config.HOUSE_LIST_REG);
}

module.exports = app;