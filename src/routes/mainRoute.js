import { Router } from 'express'
const router = Router();
import path from 'path'

import apiRoute from './apiRoute.js'
import getpostsRoute from './getpostsRoute.js'
import visit from '../controllers/visitors.js'
import player from '../controllers/player.js'
import checkIP from '../controllers/checkIP.js'

// router.get('', visit, (req, res) => {
//     res.render('index', {
//         title: 'Yuri Bilyk',
//         name: 'Me',
//     })
// })

router.get('', (req, res) => {
    const query = Object.keys(req.query)[0]
    switch (query) {
        case undefined:
            res.sendFile(path.join(import.meta.dirname, '/templates/views/portfolioMain.html'))
            break
        case 'resume':
            res.sendFile(path.join(import.meta.dirname, '/public/files/resume.pdf'))
            break
        case 'contact':
            res.sendFile(path.join(import.meta.dirname, '/templates/views/portfolioContact.html'))
            break
        default:
            res.render('404', {
                title: "404",
                mes: 'Page not found',
                name: 'Me'
            })
    }
})

router.use('/api', apiRoute)

router.use('/getposts', getpostsRoute)

router.get('/player', player)

router.get('/ip', checkIP)

router.get('/weather', visit, (req, res) => {
    res.render('weather', {
        title: 'Weather',
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
