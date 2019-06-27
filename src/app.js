const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');

const app=express();

//Define paths for express config
const publicDirectorypath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialPath=path.join(__dirname,'../templates/partials')

//Setup handleabars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

//Setup static directories to serve
app.use(express.static(publicDirectorypath));

app.get('/',(req,res)=>{
    res.render('index',{title:'Weather App',name:'anish'});
});

app.get('/about',(req,res)=>{
    res.render('about',
    {
        title:'weather app',
        name:'anish'
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"you must provide a address"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                address:req.query.address,
                location,
                forecastData
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must have a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        product:[]
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Weather page',
        helpText:'HELP ME',
        name:'anish'
    });
});
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'help404',
        message:'help article not found',
        name:'anish'
    })
})

app.get('/*',(req,res)=>{
    res.render('error',{
        title:'404',
        message:'404 page, not found',
        name:'anish'
    });
})

app.listen(5000,()=>{
    console.log("node is running at port 5000");
});
