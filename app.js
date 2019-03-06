const yargs = require('yargs');

const geocde = require('./geocode/geocode');

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

console.log(argv.a);

geocde.geocodeAddress(argv.a, (errorMessage, result)=>{
    if(errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(result);
    }
});

// ac2a88c6260d4f7f5149e6d463944e7f