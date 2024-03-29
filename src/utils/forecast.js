const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/4147504b61d3d1b305f6e9768fce0e02/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary +' It is currently ' + body.currently.temperature + ' degress out.Todays highest temp is'+body.daily.data[0].temperatureHigh+'. The temp low is'+ body.daily.data[0].temperatureLow +'There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast