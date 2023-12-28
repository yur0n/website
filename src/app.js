import 'dotenv/config'
import express from 'express'
import path from 'path'
import hbs from 'hbs'
import './database/connection.js'
import apiRoute from './routes/apiRoute.js'
import visit from './controllers/visitors.js'
import player from './controllers/player.js'
import checkIP from './controllers/checkIP.js'
// BOTS
// import './bots/vk2tg.js'                              
// import './bots/dota.js'
import './bots/weather.js'
import './bots/vk.js'
import './bots/golden.js'     

const app = express()

const publicDir = path.join(import.meta.dirname, '../public')
const viewsPath = path.join(import.meta.dirname, '../templates/views')
const partialsPath = path.join(import.meta.dirname, '../templates/partials')

app.set('trust proxy', true) // Proxy trust for req.ip
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDir))
app.use(express.json())

app.get('', visit, (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Me',
    })
})

app.use('/api', apiRoute)
app.use('/player', player)
app.get('/ip', checkIP)

app.get('/chat', (req, res) => {
    res.render('chat', {
        title: 'Chat',
        name: 'Me',
    })
})

app.get('/gold', (req, res) => {
    res.render('gold', {
        title: 'GoldenShop',
        name: 'Me',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        mes: 'Help is currently unavailable.',
        title: 'Help',
        name: 'Me'
    })
})

app.get('/bots', (req, res) => {
    res.render('bots', {
        title: 'Bots',
        name: 'Me'
    })
})

app.get('/calc', (req, res) => {
    res.render('calc', {
        title: 'Calculator',
        name: 'Me',
    })
})

app.get('/game', (req, res) => {
    res.render('game', {
        title: 'Game',
        name: 'Me',
    })
})

app.get('/privacy-policy', (req, res) => {
    res.render('privacy_policy', {
        title: 'Privacy Policy',
        name: 'Me',
    })
})

app.get('/terms-conditions', (req, res) => {
    res.render('terms_conditions', {
        title: 'Terms & Conditions',
        name: 'Me',
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        mes: 'Help article not found.',
        name: 'Me'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        mes: 'Page not found',
        name: 'Me'
    })
})

export default app
