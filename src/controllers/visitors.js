import Visitor from '../models/visitors.js'


export default async (req, res, next) => {
    let ip = req.socket.remoteAddress || req.ip || 'no IP'
    if (ip.includes("::ffff:")) ip = ip.substring(7)
    try {
        let currentIp = await Visitor.findOne({ ip })
        if (!currentIp) {
            const newVisit = new Visitor({
                ip,
                visits: 1,
                firstVisit: new Date,
                lastVisit: new Date
            })
            newVisit.save()
            .then(() => console.log(`New visitor ${ip} saved`))
            .catch((e) => console.log('Error', e))
        } else {
            currentIp.visits += 1
            currentIp.lastVisit = new Date
            currentIp.save()
            .then(() => console.log(`Visitor ${ip} updated`))
            .catch((e) => console.log(e))
        }
    } catch(e) {
        console.log(e)
    }
    next()
}