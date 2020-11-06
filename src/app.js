const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirPath))
hbs.registerPartials(partialsPath)

app.get('', (req,res) => {
    res.render('index', {
        title: "Weather App",
        name: "Anuj"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Anuj"
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: "Help",
        name: "Anuj",
        helpText: "This is some helpful text"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address is not provided'
        })
    }
    geocode(req.query.address, (error, response) => {
        if(error){
            return res.send({
                error: error
            })
        } else {
            const {latitude, longitude, location} = response
            forecast(latitude, longitude, (error, response) => {
                if(error) {
                    return res.send({
                        error: error
                    })
                } else {
                   return res.send({
                       response: response,
                       location: location
                   })
                }
            })
        }
    })
    // res.send({
    //     address: req.query.address
    // })
})

app.get("/help/*", (req,res) => {
    res.render('error', {
        title: "Help Error",
        name: "Anuj",
        errorMsg: "The article you are looking for is not here"
    })
})

app.get("*", (req, res) => {
    res.render('error', {
        title: "Error",
        name: "Anuj",
        errorMsg: "This is the error message"
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})