const socket = io();
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

function addMessage(value) {
    const item = document.createElement('li');
    item.textContent = value;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
}

form.addEventListener('submit', (e) => {
e.preventDefault();
if (input.value) {
    addMessage(input.value)
    socket.emit('new message', input.value);
    input.value = '';
}
});

socket.on('new message', function(msg) {
addMessage(msg)
});

socket.on('new user', function(msg) {
addMessage(`User ${msg} connected to the chat!`)
});