import {google} from 'googleapis';
import User from '../models/users.js';

const YOUR_CLIENT_ID = '117644416177-tlacpuvguv1vrlhrprmtaa8476ufdlgj.apps.googleusercontent.com'
const YOUR_CLIENT_SECRET = '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'
const YOUR_REDIRECT_URL = 'https://yuron.xyz/api/googleauth'

const oauth2Client = new google.auth.OAuth2(
	YOUR_CLIENT_ID,
	YOUR_CLIENT_SECRET,
	YOUR_REDIRECT_URL
);

google.options({
	auth: oauth2Client
});

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/youtube'
];

const authURL = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
	access_type: 'offline',

  // If you only need one scope you can pass it as a string
	scope: scopes
});

oauth2Client.on('tokens', async (tokens) => {
	try {
		if (tokens.refresh_token) {
			const user = User.findOne({ value: {
				auths: {
				  	googleAuth: {
					  	refresh_token: tokens.refresh_token
				  	}
			  	}
			}})
			if (!user) {
				return console.log('Google user not found for refresh token')
			}
			user.value.auths.googleAuth = tokens
			user.markModified('value')
			await user.save()
		}
	}
	catch (e) {
		console.log('Problem with database updating googleAuth tokens\n', e)
	}
});

const googleAuth = async function (req, res) {
	const key = req.query.state
    const code = req.query.code
	try {
		const {tokens} = await oauth2Client.getToken(code)
		const user = await User.findOne({ key })
		if (!user) return res.send('Auth tokens not saved')
		console.log(user)
		user.value.auths.googleAuth = tokens
		console.log(user)
		user.markModified('value')
		await user.save()
	}
	catch (e) {
		console.log('Problem with database using googleAuth\n', e)
		return res.send('Auth tokens not recived')
	}

	res.send('done')
}
export { googleAuth, authURL, oauth2Client };
