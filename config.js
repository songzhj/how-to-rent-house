const config = {
    CRAWLER_URL: "http://www.ziroom.com/z/nl/z3.html?p=",
    PAGE_START: 0,
    MDB_URL: "mongodb://test:1725@mdb.songzhj.com:27017/test",
    HOUSE_LIST_REG: /<ul id="houseList">([.\s\S]*)<\/ul>\s*(?=<div class="pages")/g,
    HOUSE_LIST_SELECTOR: "li.clearfix",
    HOUSE_INFO_REG: {
    	_id: {name: ".txt>h3>a", reg: /\d+(?=\.html)/, type: "attr", attr: "href"},
    	title: {name: ".txt>h3>a", reg: /[\s\S]*/, type: "text"},
    	address_main: {name: ".txt>h4>a", reg: /[\u4E00-\u9FA5\d]*(?=])/, type: "text"},
    	address_detail: {name: ".txt>h4>a", reg: /[\u4E00-\u9FA5\d]*$/, type: "text"},
    	area: {name: ".detail>p:first-child>span:first-child", reg: /\d+\.?\d*/, type: "text"},
    	floor: {name: ".detail>p:first-child>span:nth-child(2)", reg: /\d+\/\d+/, type: "text"},
    	household: {name: ".detail>p:first-child>span:nth-child(3)", reg: /[\s\S]*/, type: "text"},
    	rent_type: {name: ".detail>p:first-child>span:nth-child(4)", reg: /[\s\S]*/, type: "text"},
    	distance: {name: ".detail>p:nth-child(2)>span", reg: /[\u4E00-\u9FA5\d]*/, type: "text"},
    	tag: {name: ".room_tags>span", reg: /[\s\S]*/, type: "array"},
    	style: {name: ".room_tags .style", reg: /[\s\S]*/, type: "text"},
    	price: {name: ".price", reg: /\d+/, type: "text"}
    }
}
module.exports = config;