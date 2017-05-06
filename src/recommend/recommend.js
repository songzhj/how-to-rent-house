/**
 * 推荐模块
 * @author songzhj
 * @license GPL-3.0
 * @Date    2017-05-04
 */
const fetch = require('node-fetch');

const PLACE_URL = 'http://api.map.baidu.com/place/v2/search';
const DIRECTION_URL = 'http://api.map.baidu.com/direction/v2/transit';

class Recommend {
    match(house, customizations) {
        try {
            let result = recommendHouse(house, customizations);
            return result;
        } catch (err) {
            console.error(err.toString());
        }
    }
}

async function recommendHouse(house, customizations) {
    let houseLocation = await getPlace(house.address_detail);
    let suitableHouse = [];
    for (let i in customizations) {
        let location = await getPlace(customizations[i].place);
        let duration = await getDurationTime(houseLocation, location);
        if (duration < customizations[i].expectedTime) {
            let temp = {person: customizations[i], house: house, duration: duration};
            suitableHouse.push(temp);
        }
    }
    return suitableHouse;
}

async function getPlace(place) {
    let param = {
        query: place,
        region: '北京',
        city_limit: true,
        output: 'json',
        ak: 'nvW8jb4eV8fKyTwrGqQnPv0Zol2lXZTV'
    };
    let url = PLACE_URL + stringfy(param);
    try {
        let res = await fetch(url);
        let json = await res.json();
        let location = json.results && json.results[0] && json.results[0].location;
        return location;
    } catch (err) {
        console.error(err.toString());
    }
}

async function getDurationTime(houseLocation, personalLocation) {
    let param = {
        origin: `${houseLocation.lat},${houseLocation.lng}`,
        destination: `${personalLocation.lat},${personalLocation.lng}`,
        ak: 'nvW8jb4eV8fKyTwrGqQnPv0Zol2lXZTV'
    };
    let url = DIRECTION_URL + stringfy(param);
    try {
        let res = await fetch(url);
        let json = await res.json();
        let direction = json.result && json.result.routes && json.result.routes[0];
        let durationTime = direction.duration;
        return durationTime;
    } catch(err) {
        console.error(err);
    }
}

function stringfy(param) {
    let res = '?';
    for (let i in param) {
        let key = encodeURIComponent(i);
        let value = encodeURIComponent(param[i]);
        res += `${key}=${value}&`;
    }
    return res.substring(0, res.length - 1);
}

module.exports = Recommend;