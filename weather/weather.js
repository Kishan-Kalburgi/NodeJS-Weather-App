const request = require('request');

var getWeather = (lat, lon, callback) => {
    request({
        url: `https://api.darksky.net/forecast/ac2a88c6260d4f7f5149e6d463944e7f/${lat},${lon}`,
        json: true
    }, (err, res, body) => {
        if (!err && res.statusCode === 200) {
            tempObj = {
                currentTemp: body.currently.temperature,
                feelsLikeTemp:  body.currently.apparentTemperature
            }
            callback(undefined, tempObj);
        } else {
            callback('Unable to fetch weather.');
        }
    })
};

module.exports.getWeather = getWeather;