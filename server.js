const http = require('http');
const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const socketio = require('socket.io');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: './config/.env' });
}

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Connect Databases
connectDB();

//Init Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

//Socket
io.on('connection', (socket) => {
  require('./sockets/chat/chatMessage')(io, socket);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

//Public static folder
app.use('/uploads', express.static('uploads'));

//Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/chats', require('./routes/api/chats'));

const PORT = process.env.PORT || '5000';
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
