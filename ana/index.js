const mongoose = require('mongoose');
const fs = require('./src/common/FileIOPromise');
const _ = require('./src/common/util/util');
const config = require('./src/const/const');

let dataX = [];
let dataY = [];

function getModelName(now) {
    return 'h_2017_' + _.getFullMonth(now) + '_' + _.getFullDate(now);
}

function run(sDate) {
    const today = new Date();
    let promiseArr = [];
    for (let now = sDate; now < today; now = _.nextDate(now)) {
        console.log(now);
        let date = getModelName(now);
        console.log(date);
        let house = mongoose.model(date, houseSchema);
        promiseArr.push(house.find(config.CRITERIA));
        dataX.push(_.getFullMonth(now) + _.getFullDate(now));
    }
    return promiseArr;
}


function handleRes(data, i) {
    let count = 0;
    for (let item of data) {
        count += item.price;
    }

    count /= data.length;
    if (!isNaN(count)) {
        dataY.push(parseInt(count * 1.08));
    } else {
        dataX.splice(i, 1);
    }
}

mongoose.connect('mongodb://songzhj:1704@mdb.songzhj.com:27017/houseInfo');
let houseSchema = mongoose.Schema(config.MONGO_SCHEMA);
Promise.all(run(new Date('2017-02-14')))
.then((values) => {
    for (let i in values) {
        handleRes(values[i], i);
    }
    console.log(dataY.length, dataX.length);
    fs.writeFile('./info.js', 'var dataY = [' + dataY + '];' +
        'var dataX = [' + dataX.map((item) => "'" + item + "'") + '];');
    mongoose.connection.close();
})
.catch(e => {
    console.log(e.toString());
    mongoose.connection.close();
});