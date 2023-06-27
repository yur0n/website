import { Server } from 'socket.io';

export default function socket(server) {
	const io = new Server(server);

	io.use(async function(socket, next) {
		next();
	});

	io.on('connection', (socket) => {
		socket.broadcast.emit('new user', socket.handshake.address);
		socket.on('new message', (msg) => {
			socket.broadcast.emit('new message', msg);
		});
	});

	return io;
}