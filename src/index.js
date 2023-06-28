import app from './app.js'
import https from 'https'
import fs from 'fs'
import path from 'path'
import socket from './socket.js'
const port = process.env.PORT || 3000
const portTls = process.env.PORT_TLS || 443
const __dirname = path.dirname(import.meta.url).replace(/^file:\/\/\//, '')
// Certificate
const privateKey = fs.readFileSync(path.join(__dirname,'../certs/private.key.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, '../certs/domain.cert.pem'), 'utf8');
//const ca = fs.readFileSync(path.join(__dirname, '../certs/chain1.pem'), 'utf8');
const credentials = {
	key: privateKey,
	cert: certificate,
//	ca: ca
};
const httpsServer = https.createServer(credentials, app);

const server = app.listen(port, () => {
    console.log('Server is up on port: ' + port)
})

httpsServer.listen(portTls, () => {
	console.log('HTTPS Server running on port 443');
});

socket(server);