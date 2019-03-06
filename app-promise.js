const yargs = require('yargs');
const axios = require('axios');
const _ = require('lodash');

const argv = yargs
    .option({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address ID to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var locationID = argv.a;
var geocodeUrl = `https://openweathermap.org/data/2.5/weather/?appid=b6907d289e10d714a6e88b30761fae22&id=${locationID}`;

axios.get(geocodeUrl).then((res) => {
    if (_.isString(res.data)) {
        throw new Error('Unable to find that address');
    }
    var weatherUrl = `https://api.darksky.net/forecast/ac2a88c6260d4f7f5149e6d463944e7f/${res.data.coord.lat},${res.data.coord.lon}`;
    console.log(res.data.name);
    return axios.get(weatherUrl);
}).then((res) => {
    var temperature = res.data.currently.temperature;
    var apparentTemp = res.data.currently.apparentTemperature;
    console.log(`Its currently ${temperature}. It feels like ${apparentTemp}.`)
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
});