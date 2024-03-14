import geoip from 'geoip-lite'

export default (req, res) => {
    let ip = req.headers['CF-Connecting-IP'] // req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip || 'no IP'
    if (ip.includes("::ffff:")) ip = ip.substring(7)
    if (ip == '::1') {          // So it can properly work on localhost
        ip = '93.77.79.107'      // So it can properly work on localhost
    }
    const geo = geoip.lookup(ip)
    if(!geo) return res.send('IP problem, refresh the page')
    res.render('ip', {
        title: 'IP',
        name: 'Me',
        ip,
        geo,
        lat: geo.ll[0],
        long: geo.ll[1],
        })
}
