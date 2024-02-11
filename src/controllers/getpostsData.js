import User from '../models/users.js'

export default async (req, res) => {
	console.log(req.headers)
	try {
		const user = await User.findOne({ key: req.query.id })
		if (!user) return res.send({ error: 'User not found' })
		res.send({ bots: user.value.bots, auths: user.value.auths })
	} catch (e) {
		console.log(e)
		res.send({ error: 'Internal error'})
	}
}