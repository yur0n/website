import {google} from 'googleapis';
import User from '../models/users.js';

const oauth2Client = new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	process.env.GOOGLE_REDIRECT_URL
);

google.options({
	auth: oauth2Client
});

const scopes = [
  'https://www.googleapis.com/auth/youtube.readonly',
//   'https://www.googleapis.com/auth/userinfo.profile',
//   'https://www.googleapis.com/auth/userinfo.email'
];

const authURL = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
	access_type: 'offline',
	scope: scopes
});

oauth2Client.on('tokens', async (tokens) => {
	try {
		if (tokens.refresh_token) {
			const user = await User.findOne({ value: {
				auths: {
				  	googleAuth: {
					  	refresh_token: tokens.refresh_token
				  	}
			  	}
			}})
			if (!user) return 
			user.value.auths.googleAuth = tokens
			user.markModified('value')
			await user.save()
		}
	}
	catch (e) {
		console.log('Problem with database updating googleAuth tokens\n\n', e)
	}
});

const googleAuth = async function (req, res) {
	const key = req.query.state
    const code = req.query.code
	try {
		const {tokens} = await oauth2Client.getToken(code)
		const user = await User.findOne({ key })
		if (!user) return res.send('Auth tokens not saved')
		user.value.auths.googleAuth = tokens
		user.markModified('value')
		await user.save()
	}
	catch (e) {
		console.log('Problem with database using googleAuth\n\n', e)
		return res.send('Auth tokens not recived')
	}

	res.send('done')
}
export { googleAuth, authURL, oauth2Client };
