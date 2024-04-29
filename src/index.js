import app from './app.js';
import https from 'https';
import fs from 'fs';
import path from 'path';
import socket from './socket.js';
const port = process.env.PORT || 3000;
const portTls = process.env.PORT_TLS || 443;

import './database/connection.js'
BOTS                             
import './getposts/bot.js'
import './getposts/worker.js'

// HTTP server
// app.listen(port, () => {
//     console.log('Server is up on port: ' + port);
// })

// // Certs
const privateKey = fs.readFileSync(path.join(import.meta.dirname, '../certs/cdn_private.key.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(import.meta.dirname, '../certs/cdn_domain.cert.pem'), 'utf8');
// const ca = fs.readFileSync(path.join(import.meta.dirname, '../certs/authenticated_origin_pull_ca.pem'), 'utf8');
const credentials = {
	key: privateKey,
	cert: certificate,
	// ca: ca
};

const httpsServer = https.createServer(credentials, app);

const server = httpsServer.listen(portTls, () => {
	console.log('HTTPS Server running on port: ' + portTls);
});

socket(server);
