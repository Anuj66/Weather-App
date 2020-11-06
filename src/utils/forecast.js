const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8aa7a3f857606a638d99b4374d559be6&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to access the api!', undefined)
        } else if (response.body.error) {
            callback('Unable to find the location!', undefined)
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                feels_like_temperature: response.body.current.feelslike,
                precipitation: response.body.current.precip,
                weather_description: response.body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast