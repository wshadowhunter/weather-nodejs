const request = require('request')

const forcast = (a,b, callback)=>{
    const url = `https://api.darksky.net/forecast/42b3dbaffee44ca1bf306b2391adfe6f/${a},${b}?exclude=daily,hourly,minutely,alerts,flags&units=si&lang=zh`

    request({url,json:true},(error,{body}) => {
        if(error) {
            callback('unbale to connect to weather service')
        } else {
            const data = body
            callback(undefined, {temperature:data.currently.temperature,precip: data.currently.precipProbability})
        }
    })
}

module.exports = forcast