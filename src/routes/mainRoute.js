import { Router } from 'express'
import path from 'path'
const router = Router();
import apiRoute from './apiRoute.js'
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

router.get('/player', player)

router.get('/ip', checkIP)

router.get('/getposts', (req, res) => {
    const headers = req.headers
    const botId = req.headers['x-telegram-bot-token'];
  const userId = req.headers['x-telegram-user-id'];
  console.log(userId, botId, headers)

    res.sendFile(path.join(import.meta.dirname, '../../templates/views/getposts.html'))
})

router.post('/getposts', (req, res) => {
    const {name, email, message} = req.query
    if (!name || !email || !message) return res.status(400).send({error: 'Specify all params'})
    res.send('OK')
})

router.get('/getposts/privacy-policy', (req, res) => {
    res.render('privacy_policy', {
        title: 'Privacy Policy',
        name: 'Me',
    })
})

router.get('/getposts/terms-conditions', (req, res) => {
    res.render('terms_conditions', {
        title: 'Terms & Conditions',
        name: 'Me',
    })
})

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