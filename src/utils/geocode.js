const request = require('request')
const geocode = (address,callback) => {

  const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2Fpem9rdTQwNCIsImEiOiJja2lrZWttMXowOTZnMnhsNGJ1dmxrczdiIn0.MPGPKuvW1X6DhBDIuIP5JA&limit=1'
// console.log(address);
  request({url,json:true},(error,{body}={})=> {
    // console.log(response);
    if (error){
      callback('Unable to connect',undefined)
    }
    else if(body.features.length === 0){
      callback('Unable to find loaction',undefined)
    }
    else{

      const ans = {
        lat:body.features[0].center[1],
          long:body.features[0].center[0],
          location:body.features[0].place_name


      }
      callback(undefined,ans)
    }
  })

}
module.exports = geocode
