const request = require('request')
const geocode = (address, callback) => {
    address = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoid3NoYWRvd2h1bnRlci1sZW5vdm93b3JrIiwiYSI6ImNrMWkxbDd1ajBzNXUzY3MwOTR6eHg0bGUifQ.xOwQt3bNwEG_I2OEe2JGpQ&language=zh&limit=1`
    request({url,json:true},(error,{body})=>{
        if(error || !body.features[0]) {
            callback('Unable to connect to location S')
        } else {

            const lat = body.features[0].center[1]
            const lng = body.features[0].center[0]
            const name = body.features[0].place_name
            callback(undefined,{
                lat, 
                lng,
                name
            })
        }
    })
}

module.exports = geocode