const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()

const viewDirectory = path.join(__dirname,'../viewTemplate/views')
const partialsPath = path.join(__dirname,'../viewTemplate/partials')

app.set('view engine','hbs')
app.set('views', viewDirectory)
hbs.registerPartials(partialsPath)
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'hao'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'Weather App - about',
        name: 'hao'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Weather App - help',
        name: 'hao'
    })
})

app.get('/weather',(req,res)=>{
    const address = req.query.address
    if(!address) {
        return res.send({error:'provide address'})
    }

    geocode(address, (error,{name,lat,lng}={})=>{
        //console.log(name)
        if(error) return res.send({error:'invalid'})
        forcast(lat,lng,(error,data)=>{
            //console.log(data)
            res.send({
                ...data,
                name
            })
        })
        
    })

    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{title:'404',message:'help article not found'})
})

app.get('*',(req,res)=>{
    res.render('404',{title:'404',message:'page not found'})
})

app.listen(3000,()=>{
    console.log('server started')
})