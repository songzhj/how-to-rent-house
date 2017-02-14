const config = {
    CRAWLER_URL: "http://www.webapi.ziroom.com/v6/room/list.json?sign=0cb91607b40b507e3af81e4e45b5851d&timestamp=1487056934&os=android%3A6.0&app_version=5.0.4&imei=862452030218085&city_code=110000&page=",
    PAGE_START: 0,
    MDB_URL: "",
    HOUSE_LIST_REG: /<ul id="houseList">([.\s\S]*)<\/ul>\s*(?=<div class="pages")/g,
    HOUSE_LIST_ITEM_SELECTOR: "li.clearfix",
    HOUSE_INFO_REG: {
    	_id: "id",
    	title: "name",
    	address_main: "resblock_name",
    	address_detail: "resblock_name",
    	area: "area",
    	floor: "floor",
    	household: "bedroom",
    	rent_type: "type",
    	distance: "subway_station_info",
    	tag: "tags",
    	style: "",
    	price: "price"
    },
    MONGO_SCHEMA: {
    	_id: Number,
    	title: String,
    	address_main: String,
    	address_detail: String,
    	area: Number,
    	floor: String,
    	household: String,
    	rent_type: String,
    	distance: String,
    	tag: [String],
    	style: String,
    	price: Number
    }
}
module.exports = config;