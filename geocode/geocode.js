const request = require('request');
const _ = require('lodash');

const geocodeAddress = (locationID, callback) => {

    // 5799783 = king county
    // 4989266 = coldwater
    // 4679195 = carrollton

    request({
        url: `https://openweathermap.org/data/2.5/weather/?appid=b6907d289e10d714a6e88b30761fae22&id=${locationID}`,
        json: true
    }, (err, res, body) => {
        if (err) {
            callback('Unable to connect to openweathermap server');
        } else if (_.isString(body)) {
            callback('Unable to find that address');
        } else if (!_.isString(body)) {
            callback(undefined, {
                address: body.name,
                lon: body.coord.lon,
                lat: body.coord.lat
            })
        }

    });
}

module.exports.geocodeAddress = geocodeAddress;