import { Router } from 'express'
import path from 'path'
const router = Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(import.meta.dirname, '../../templates/views/getposts.html'))
})

router.post('/', (req, res) => {
    const {name, email, message} = req.body
    if (!name || !email || !message) return res.status(400).send('Complete all fields!')
    res.send('Message recived. Thank you!')
})

router.get('/account', (req, res) => {
    res.sendFile(path.join(import.meta.dirname, '../../templates/views/getpostsAcc.html'))
})

router.get('/privacy-policy', (req, res) => {
    res.render('privacy_policy', {
        title: 'Privacy Policy',
        name: 'Me',
    })
})

router.get('/terms-conditions', (req, res) => {
    res.render('terms_conditions', {
        title: 'Terms & Conditions',
        name: 'Me',
    })
})

export default router