import {google} from ('googleapis');

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

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
	access_type: 'offline',

  // If you only need one scope you can pass it as a string
	scope: scopes
});
console.log(url)

oauth2Client.on('tokens', (tokens) => {
	if (tokens.refresh_token) {
	  // store the refresh_token in my database!
	  console.log(tokens.refresh_token);
	}
	console.log(tokens.access_token);
});

export default async (req, res) => {
    const code = req.params.code

	const {tokens} = await oauth2Client.getToken(code)
	//save tokens to db pls, maybe saved on tokens event(check it)
	oauth2Client.setCredentials(tokens)
}
