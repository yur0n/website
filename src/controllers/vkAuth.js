import axios from 'axios'
import Session from '../models/sessions.js'

export default async (req, res) => {
    axios.get(`https://oauth.vk.com/access_token?client_id=51504694&client_secret=dPIjYcxdyMO29LuCjOdZ&redirect_uri=https://yuron.xyz/api/vkAuth&code=${req.query.code}`)
    .then(async(data) => {
        
        console.log(data.data.user_id, req.query.state)

        const user = await Session.findOne({key: req.query.state}).catch(console.log)
	    if (!user) return res.send('Authorized but your token is not connected to Get Posts, write to support')
        user.data.access_tokenVK = data.data.access_token
	    user.markModified('data')
        await user.save().catch(console.log)

        res.send('Authorized, you can close the page now') 
    }).catch((e) => {
        console.log(e)
        res.send('Not authorized, something went wrong') 
    })
}
