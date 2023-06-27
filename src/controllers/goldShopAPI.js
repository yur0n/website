import GoldUser from '../models/gold.js'
import newBuy from '../bots/golden.js'

export default async (req, res) => {
    if (!req.query.name || !req.query.bonus) return res.send({error: 'no user provided'})
    let goldUserName = req.query.name
    let goldUserBonus = req.query.bonus
    try {
        let currentGoldUser = await GoldUser.findOne({name: goldUserName})
        if (!currentGoldUser) {
            const newGoldUser = new GoldUser({
                name: goldUserName,
                bonus: goldUserBonus
            })
            await newGoldUser.save().then(() => {
                console.log(`New GoldUser saved`)
            }).catch((error) => {
                console.log('Error', error)
            })
        } else {
            currentGoldUser.bonus += +goldUserBonus
            await currentGoldUser.save()
            console.log(`GoldUser updated`)
            newBuy({goldUserName, goldUserBonus})
        }
    } catch (e) {
        console.log(e)
    }
    res.send('ok')
}