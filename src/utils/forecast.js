
// fn
const request = require('request')
const forecast = (lat,long,callback)=>{
const url = 'http://api.weatherstack.com/current?access_key=5c467cbb5fefeb6619487a4485d85f10&query='+lat+','+long+'&units=m'
// console.log(url);
request({url,json:true},(error,{body}) => {
  if (error){
    callback('Unable to connect',undefined)
  }
  else if(body.error){
    callback('Unable to find location',undefined)
  }
  else{

    callback(undefined,body.current.weather_descriptions[0] + ". it is currently "+body.current.temperature+" degree out. It feels like "+body.current.feelslike +' degree out and the humidity is ' + body.current.humidity+' out there.' )
}
})
}
module.exports= forecast
