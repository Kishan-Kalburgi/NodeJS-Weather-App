const yargs = require('yargs');

const geocde = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocde.geocodeAddress(argv.a, (errorMessage, result)=>{
    if(errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(result.address);
        weather.getWeather(result.lat, result.lon, (errorMessage, weatherResult) => {
            if(errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`Its currently ${weatherResult.currentTemp}. It feels like ${weatherResult.feelsLikeTemp}.`);
            }
        });
    }
});