const geocode = require('./utils/geocode')
const forecast = require("./utils/forecast")
const process = require("process")
const express = require('express')
const  path = require('path')
const app = express()
const hbs = require('hbs')

//Define path for Express config
const publicdir = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')
// Set handlebars engine and views
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)
// Setup of Static
app.use(express.static(publicdir))
app.get('',(req,res)=>{
  res.render('index',{
    title: 'Weather App',
    name: 'Anshul Gupta'
  })

})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About',
    name:'Anshul Gupta'
  })
})
app.get('/help',(req,res)=>{
  res.render('help',{
    title:'Help Page',
    name:'Anshul Gupta',
    message:'I am here to help u'
  })
})
app.get('/weather', (req,res)=>{
  if(!req.query.address)
  {
    return res.send({
      error: 'You must provide address'
    })
  }
  const data = geocode(req.query.address,(error,{lat,long,location}={})=>
  {
    if(error){
      return res.send({
      error: error

    })
  }
    else{
          const data2 = forecast(lat,long,(error,forcdata)=>{
          if(error){
            res.send({
              error: error
            })
        }
        else {
          res.send({
            location: location,
            forecasts:forcdata,
            address: req.query.address
          })

            }
        })
      }
  })
  // res.send({
  //   location:'Gwalior',
  //   Temprature:'22',
  //   address:req.query.address
  // })
})
app.get('/products',(req,res)=>{
  if(!req.query.search){
  return  res.send({
      error:'You must provide a search term '
    })

  }

  console.log(req.query.search)
  res.send({
    products:[]
  })
})
app.get('/help/*',(req,res)=>{
  res.render('error',{
    title:'404,Help',
    name:'AnshulGupta',
    errorM:'Help article not found'
  })
})

app.get('*',(req,res)=>{
  res.render('error',{
    title:'404',
    errorM:'Page not Found',
    name:'AnshulGupta'
  })

})

app.listen(3000,()=>{
  console.log('Server is up on 3000.');
})
