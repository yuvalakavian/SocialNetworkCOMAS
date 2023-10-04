
const socketIo = require('socket.io');

const JOIN_CHAT = 'join chat'
const LEAVE_CHAT = 'leave chat'
const SEND_MESSAGE = 'send message'
const DISCONNECT = 'disconnect'

const initChatSocket = (server) => {
    const io = socketIo(server);

    io.on('connection', (socket) => {

        socket.on(JOIN_CHAT, (chatId) => {
            socket.join(chatId);
            console.log(`User joined chat room: ${chatId}`);
        });

        socket.on(LEAVE_CHAT, (chatId) => {
            socket.leave(chatId);
            console.log(`User left chat room: ${chatId}`);
        });

        socket.on(SEND_MESSAGE, (data) => {
            const { chatId, message } = data;
            console.log(`Received message in chat room ${chatId}: ${message}`);
            io.to(chatId).emit('chat message', message);
        });

        socket.on(DISCONNECT, () => {
            console.log('A user disconnected');
        });
    })
}

module.exports = {
    initChatSocket
}

