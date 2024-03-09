import geoip from 'geoip-lite';
import geocode from '../utils/geocode.js';
import forecast from '../utils/forecast.js';

export default async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip
    const geo = geoip.lookup(ip)
	console.log('Address: ' + req.query.address, '\nGeo info: ' + ip)
    if (!req.query.address && !geo) return res.send({error: 'You must provide an address'})                                    
    let position = await geocode(req.query.address || geo.city)
    if (!position.latitude) return res.send({error: position})
    let prediction = await forecast(position.latitude, position.longitude)
    if (!prediction.today) return res.send({error: prediction})
    res.send({
        'forecast': prediction.today,
        'location': position.location, //location from geocode
        daily: prediction.tomorrow,
	    temp: prediction.temp,
	    main: prediction.main,
	    icon: prediction.icon
    })
}
