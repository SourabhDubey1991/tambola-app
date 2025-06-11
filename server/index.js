const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

let calledNumbers = [];

io.on('connection', (socket) => {
  console.log('New client:', socket.id);

  socket.emit('init', { calledNumbers });

  socket.on('call-number', () => {
    let number;
    do {
      number = Math.floor(Math.random() * 90) + 1;
    } while (calledNumbers.includes(number) && calledNumbers.length < 90);

    calledNumbers.push(number);
    io.emit('number-called', number);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(10000, () => {
  console.log('Server listening on port 10000');
});
