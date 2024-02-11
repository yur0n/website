import { Router } from 'express'
const router = Router();
import apiRoute from './apiRoute.js'
import getpostsRoute from './getpostsRoute.js'
import visit from '../controllers/visitors.js'
import player from '../controllers/player.js'
import checkIP from '../controllers/checkIP.js'

router.get('', visit, (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Me',
    })
})

router.use('/api', apiRoute)

router.use('/getposts', getpostsRoute)

router.get('/player', player)

router.get('/ip', checkIP)


router.get('/chat', (req, res) => {
    res.render('chat', {
        title: 'Chat',
        name: 'Me',
    })
})

router.get('/gold', (req, res) => {
    res.render('gold', {
        title: 'GoldenShop',
        name: 'Me',
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Me'
    })
})

router.get('/help', (req, res) => {
    res.render('help', {
        mes: 'Help is currently unavailable.',
        title: 'Help',
        name: 'Me'
    })
})

router.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        mes: 'Help article not found.',
        name: 'Me'
    })
})

router.get('/bots', (req, res) => {
    res.render('bots', {
        title: 'Bots',
        name: 'Me'
    })
})

router.get('/calc', (req, res) => {
    res.render('calc', {
        title: 'Calculator',
        name: 'Me',
    })
})

router.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        mes: 'Page not found',
        name: 'Me'
    })
})

export default router