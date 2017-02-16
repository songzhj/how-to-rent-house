/**
 * 数据预处理，将html匹配为需要的数据
 * @author songzhj
 * @license GPL-3.0
 * @Date    2017-01-12
 */

class Pretreatment {

    /**
     * 从爬取到的数据中解析有效数据
     * @param   {String}   data 爬取到的数据
     * @return  {json}        解析后的json数据
     */
    resolveData(data) {
        let houseData = data.data;
        let resData = {};
        resData.houses = [];
        try {
            houseData.forEach((value, index) => {
                let house = {};
                house._id = value.id;
                house.title = value.name;
                house.address_main = value.resblock_name;
                house.address_detail = value.resblock_name;
                house.area = value.area;
                house.floor = value.floor + "/" + value.floor_total;
                house.household = value.bedroom + "室" + value.parlor + "厅";
                house.rent_type = value.type === 0 ? "整" : "合";
                house.distance = value.subway_station_info;
                house.tag = [];
                house.style = "";
                house.price = value.price;
                value.tags.forEach((value, index) => {
                    house.tag.push(value.title);
                });
                resData.houses.push(house);
            });      
        } catch(e) {
            console.warn(e.toString());
            return resData;
        }
        return resData;
    }
}

module.exports = Pretreatment;